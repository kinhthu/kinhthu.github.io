# Kế hoạch Kỹ thuật: Sửa lỗi Deploy GitHub Pages (deploy.yml)

Tài liệu này phân tích nguyên nhân và đưa ra các bước sửa lỗi chi tiết cho việc không thể deploy code mới lên GitHub Pages của dự án **kinhthu-site**.

---

## 1. Phân tích Nguyên nhân (Root Cause Analysis)

Trong lịch sử commit, cụ thể là commit `23d97acba18aa93c6328946c229ce0b890bc27df` ("Update deploy.yml"), cấu hình của file `.github/workflows/deploy.yml` đã bị thay đổi như sau:
* Kích hoạt lại trigger `push` lên branch `main`.
* Thay đổi nhánh đích deploy tĩnh: `publish_branch: main` (thay vì `gh-pages` ban đầu).

### Hậu quả:
1. Khi có bất kỳ push nào lên `main`, workflow `Deploy Portfolio to GitHub Pages` sẽ kích hoạt. Nó build dự án ra thư mục `./out`.
2. Action `peaceiris/actions-gh-pages@v4` nhận nhiệm vụ đẩy các file trong `./out` lên nhánh đích (`publish_branch: main`).
3. Vì nhánh đích là `main` (trùng với nhánh chứa source code), **toàn bộ source code của dự án (thư mục `src/`, `package.json`, các file `.github/workflows/`) bị ghi đè hoàn toàn** bằng các file HTML/JS tĩnh của bản build.
4. Do các file workflow biến mất trên nhánh `main` ở GitHub, các lượt push tiếp theo của bạn sẽ không kích hoạt chạy deploy nữa. Đồng thời, lịch sử Git local và remote bị lệch (diverged), khiến việc push thông thường bị lỗi.

---

## 2. Giải pháp Thực hiện (Technical Plan)

Để giải quyết triệt để và khôi phục lại dự án, chúng ta cần thực hiện các bước sau:

### Bước 1: Khôi phục lại mã nguồn ở Local (Đã thực hiện)
Khôi phục local branch `main` về commit chứa đầy đủ mã nguồn nguồn trước khi bị ghi đè:
```bash
git reset --hard a18128792a252ab619863b773899362fd0002664
```

### Bước 2: Sửa cấu hình deploy.yml
Sửa đổi file [.github/workflows/deploy.yml](file:///D:/workspace/kinhthu-site/.github/workflows/deploy.yml) để đẩy bản build tĩnh lên nhánh `gh-pages` thay vì nhánh `main`:
```yaml
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          publish_branch: gh-pages   # SỬA LẠI ĐÂY
          cname: ""
```

### Bước 3: Vô hiệu hóa Workflow trùng lặp (nextjs.yml)
Tránh xung đột do chạy song song cả 2 workflow deploy. Cần comment out hoặc tắt trigger `push` trong [.github/workflows/nextjs.yml](file:///D:/workspace/kinhthu-site/.github/workflows/nextjs.yml).
```yaml
on:
  # Tạm thời tắt trigger push để dùng deploy.yml
  # push:
  #   branches: ["main"]
  workflow_dispatch:
```

### Bước 4: Commit thay đổi cấu hình
Commit các thay đổi sửa lỗi cấu hình trên:
```bash
git add .github/workflows/deploy.yml .github/workflows/nextjs.yml
git commit -m "fix: restore deployment target branch to gh-pages and disable nextjs.yml trigger"
```

### Bước 5: Force Push để khôi phục nhánh `main` trên GitHub
Do nhánh `main` trên GitHub đang bị lưu các file tĩnh đã build, ta bắt buộc phải sử dụng tham số `--force` để đẩy lại toàn bộ lịch sử commit mã nguồn gốc lên GitHub:
```bash
git push origin main --force
```

### Bước 6: Cấu hình lại GitHub Pages trên giao diện Web GitHub
Truy cập vào trang cấu hình repository trên trình duyệt:
1. Vào **Settings** -> **Pages**.
2. Tại mục **Build and deployment** -> **Source**: Chọn **"Deploy from a branch"**.
3. Tại mục **Branch**: Chọn nhánh **`gh-pages`** và thư mục là **`/ (root)`**.
4. Bấm **Save**.

Sau khi lưu cấu hình này, GitHub sẽ tự động phân phối trang web tĩnh từ nhánh `gh-pages` (được cập nhật tự động mỗi khi bạn push code lên `main`), và nhánh `main` sẽ giữ nguyên vẹn mã nguồn của bạn.
