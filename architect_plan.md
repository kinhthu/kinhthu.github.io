# Kế Hoạch Kỹ Thuật: Đập đi xây dựng lại Portfolio bằng Next.js & Tailwind CSS

## Mục tiêu & phạm vi
- **Mục tiêu**: Thay thế toàn bộ mã nguồn Gatsby v2 (lạc hậu, chạy Node v14) của trang Portfolio `kinhthu.github.io` bằng dự án Next.js mới nhất sử dụng App Router, chạy được trên Node.js hiện đại (v18, v20, v22) và sử dụng Tailwind CSS để thiết kế giao diện tối cao cấp (Premium Dark Theme).
- **Phạm vi**:
  - Dọn dẹp toàn bộ mã nguồn và tệp tin Gatsby v2 cũ, chỉ giữ lại `.git`, `.gitignore`, `README.md` và thư mục `.agents`/`agents`.
  - Khởi tạo dự án Next.js (App Router) mới bằng `npx create-next-app` hoặc cấu hình tương đương tương thích với Node.js v18+.
  - Xây dựng lại các Section: Hero (typing effect), About Me, Experience Timeline, Skills, Projects (đọc GitHub API + static fallback), và Header/Footer.
  - Hỗ trợ Responsive hoàn toàn trên Mobile và Desktop.
  - Cấu hình Static HTML Export (`output: 'export'`) vì trang được triển khai trên GitHub Pages (`kinhthu.github.io`).

## Phương án
- **Công nghệ cốt lõi**:
  - **Framework**: Next.js App Router (bản mới nhất v14/v15).
  - **CSS**: Tailwind CSS.
  - **Icon**: `react-icons`.
  - **Animation**: Tailwind transitions & Custom keyframe animations (cho typing effect và hover).
- **Lý do lựa chọn**:
  - Next.js cung cấp cấu trúc App Router cực kỳ sạch sẽ, hỗ trợ Static Export dễ dàng thông qua `output: 'export'`.
  - Tailwind CSS giúp xây dựng giao diện tùy biến nhanh chóng mà không cần viết file CSS riêng lẻ cồng kềnh, giảm nguy cơ xung đột.
  - Sử dụng GitHub Pages yêu cầu xuất ra thư mục tĩnh (`out/`), Next.js hỗ trợ trực tiếp việc này.
- **Phương án bị loại bỏ**:
  - *Gatsby v4/v5*: Dù nâng cấp Gatsby khả thi, nhưng hệ sinh thái plugin Gatsby khá cồng kềnh và dễ lỗi phiên bản khi Node.js thay đổi. Next.js phổ biến và ổn định hơn.
  - *React SPA thuần*: Next.js cung cấp tối ưu hóa ảnh, font và cấu trúc routing tốt hơn cho SEO.

## Thiết kế kỹ thuật
### 1. Cấu trúc thư mục dự kiến
```
wt-d4cb3a31912044bdb7fd7ae3cab0c7a9/
├── public/                  # Các file tĩnh (favicon, avatar, cover)
│   └── images/
│       ├── avatar.png       # Kế thừa từ static/images cũ
│       └── cover.jpeg       # Kế thừa từ static/images cũ
├── src/
│   ├── app/
│   │   ├── layout.js        # Cấu hình Layout, Font (Inter), SEO Metadata
│   │   ├── globals.css      # Tailwind directives & global dark theme variables
│   │   └── page.js          # Trang chủ duy nhất (Single Page Portfolio)
│   ├── components/          # Các component giao diện
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Hero.js          # Chứa typing animation
│   │   ├── About.js         # About Me section
│   │   ├── Timeline.js      # Experience timeline
│   │   ├── Skills.js        # Skills grid & badges
│   │   └── Projects.js      # Projects grid (GitHub API + Fallback)
│   └── data/
│       └── portfolioData.js # Chuyển đổi từ siteConfig.js cũ sang ES6 module
├── next.config.js           # Cấu hình Next.js (bắt buộc thêm output: 'export')
├── tailwind.config.js       # Cấu hình Tailwind (Colors, dark mode)
├── package.json
└── jsconfig.json
```

### 2. Contract dữ liệu (`src/data/portfolioData.js`)
Dữ liệu sẽ được trích xuất từ `data/siteConfig.js` cũ sang định dạng Javascript ES6 module sạch:
```javascript
export const portfolioData = {
  siteTitle: "Hi! I'm Kinh Thu!",
  authorName: "Kinh Thu",
  authorAvatar: "/images/avatar.png",
  authorDescription: `...`, // HTML string chứa mô tả
  skills: [
    { name: 'HTML', level: 80 },
    ...
  ],
  jobs: [
    {
      company: "Launch Deck LLC",
      begin: { month: 'Jun', year: '2019' },
      duration: null,
      occupation: "Frontend / Mobile developer",
      description: "..."
    },
    ...
  ],
  social: {
    twitter: "https://twitter.com/Kinh_Thu_",
    linkedin: "https://www.linkedin.com/in/letruongkinhthu/",
    github: "https://github.com/kinhthu",
    email: "letruongkinhthu@gmail.com"
  }
}
```

### 3. Giao diện & Thẩm mỹ (UI/UX)
- **Theme**: Premium Dark Theme làm mặc định.
  - Background chính: Dark Slate/Blue (`#0b0f19`).
  - Text chính: Slate-200 (`#e2e8f0`), Slate-400 (`#94a3b8`).
  - Accent Color: Indigo-500 (`#6366f1`), Cyan-500 (`#06b6d4`).
  - Cards: Dark Slate với viền mỏng bóng bẩy (`bg-slate-900/50 backdrop-blur-md border border-slate-800`).
- **Micro-animations**:
  - Hiệu ứng gõ chữ (typing animation) trong Hero section sử dụng custom CSS keyframe hoặc thư viện/logic custom đơn giản.
  - Hover effects: Tăng nhẹ kích thước card, hiệu ứng glow mờ phía dưới card dự án/timeline point.

## Hạng mục công việc
1. **Task 1: Dọn dẹp mã nguồn Gatsby v2 cũ và khởi tạo dự án Next.js mới**
   - *Mô tả*: Xóa toàn bộ file và thư mục cũ (trừ `.git`, `.gitignore`, `README.md`, và `.agents`/`agents`). Tạo dự án Next.js App Router mới bằng `npx create-next-app@latest . --js --tailwind --eslint --app --src-dir` (sử dụng `-y` và không tương tác).
   - *Cơ sở nghiệm thu*: Thư mục cũ được dọn dẹp sạch sẽ, dự án Next.js khởi tạo thành công, chạy được `npm run dev`.
2. **Task 2: Thiết lập cấu trúc thư mục, tệp cấu hình và CSS nền tảng (Dark Theme)**
   - *Mô tả*: Cấu hình `next.config.js` với `output: 'export'` và `images: { unoptimized: true }` để hỗ trợ GitHub Pages. Thiết lập hệ màu sắc Dark Theme trong `tailwind.config.js` và global styles trong `src/app/globals.css`. Tạo file dữ liệu `src/data/portfolioData.js` và chuyển các ảnh cũ (`avatar.png`, `cover.jpeg`) sang `public/images/`.
   - *Cơ sở nghiệm thu*: Cấu hình Next.js và Tailwind hoàn thiện. Ứng dụng chạy ở chế độ Dark Theme mặc định. Các file ảnh được nhận diện đúng.
3. **Task 3: Phát triển Header/Footer, Hero Section và component About Me**
   - *Mô tả*: Xây dựng Header thanh lịch với các menu anchor link nhảy đến các phần tương ứng, Footer chứa thông tin bản quyền và liên kết mạng xã hội (từ `portfolioData`). Phát triển Hero Section với hiệu ứng gõ chữ ("Do WHAT you LOVE, and LOVE what you DO"). Phát triển About Me hiển thị mô tả bản thân từ `portfolioData`.
   - *Cơ sở nghiệm thu*: Header/Footer và các Section hiển thị đúng thông tin, hiệu ứng gõ chữ hoạt động mượt mà.
4. **Task 4: Phát triển Experience Timeline và Skills Section với Badges**
   - *Mô tả*: Xây dựng component Timeline hiển thị lịch sử nghề nghiệp trực quan, định dạng dạng danh sách dọc sang trọng. Xây dựng Skills section hiển thị các kỹ năng công nghệ bằng các badge kết hợp biểu tượng tương ứng từ `react-icons`.
   - *Cơ sở nghiệm thu*: Timeline hiển thị đầy đủ 4 công việc cũ theo đúng thứ tự thời gian. Skills hiển thị trực quan dạng grid/badges.
5. **Task 5: Phát triển Projects/Portfolio Section tích hợp GitHub API**
   - *Mô tả*: Viết logic gọi GitHub API (`https://api.github.com/users/kinhthu/repos`) để lấy danh sách các repository nổi bật của người dùng `kinhthu`. Thiết kế fallback tĩnh (đọc danh sách repo giả lập hoặc dự án tĩnh từ dữ liệu cấu hình) đề phòng API Rate Limit hoặc lỗi kết nối.
   - *Cơ sở nghiệm thu*: Các dự án hiển thị dạng Grid Card đẹp mắt. Thử nghiệm ngắt mạng vẫn hiển thị các dự án fallback một cách chuyên nghiệp.
6. **Task 6: Kiểm thử giao diện responsive, build tối ưu hóa (Static Export) và đẩy code lên git**
   - *Mô tả*: Kiểm thử hiển thị trên các màn hình di động, máy tính bảng và desktop. Chạy thử lệnh `npm run build` để xuất bản bản dựng tĩnh vào thư mục `out/`. Kiểm tra lỗi biên dịch. Tạo 1 commit duy nhất chứa toàn bộ mã nguồn mới và thực hiện push lên nhánh main.
   - *Cơ sở nghiệm thu*: Build pass 100%, không cảnh báo nghiêm trọng. Bản xuất tĩnh chạy độc lập ổn định. Commit duy nhất được đẩy thành công lên nhánh remote `main`.

## Rủi ro & giảm thiểu
- **Rủi ro 1: Lỗi GitHub Pages do đường dẫn tài nguyên tĩnh hoặc Routing**:
  - *Mô tả*: GitHub Pages chạy dưới domain con hoặc root, nếu cấu hình Next.js không đúng, file CSS/JS hoặc ảnh có thể bị lỗi 404.
  - *Giảm thiểu*: Cấu hình `images: { unoptimized: true }` trong `next.config.js` và đảm bảo xuất Static HTML Export đúng cách. Sử dụng các thẻ `img` HTML chuẩn thay cho `next/image` nếu gặp vấn đề với Static Export.
- **Rủi ro 2: GitHub API Rate Limit**:
  - *Mô tả*: GitHub giới hạn lượt gọi API ẩn danh (60 req/hour). Nếu người dùng tải trang nhiều lần, phần Projects có thể bị trống.
  - *Giảm thiểu*: Thiết kế UI hiển thị danh sách các repo tĩnh lưu sẵn làm fallback nếu API trả về lỗi hoặc quá hạn mức.

## Cách verify end-to-end
1. **Chạy dev local**: Chạy `npm run dev`, mở trình duyệt truy cập `http://localhost:3000`. Kiểm tra sự hiện diện đầy đủ của các Section (Hero, About, Timeline, Skills, Projects).
2. **Kiểm tra Responsive**: Sử dụng Chrome DevTools giả lập kích thước Mobile (iPhone SE, Pixel) để xác nhận bố cục không bị vỡ.
3. **Build tĩnh**: Chạy `npm run build` và xác nhận thư mục `out/` được tạo thành công chứa toàn bộ file `.html`, `.js`, `.css` và tài nguyên hình ảnh.
4. **Kiểm thử Offline**: Mở trực tiếp file `out/index.html` hoặc chạy máy chủ HTTP tĩnh (ví dụ `npx serve out`) để đảm bảo trang hoạt động offline/không có backend.
