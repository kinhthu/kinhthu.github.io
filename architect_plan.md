Tôi đã lập kế hoạch kỹ thuật chi tiết theo yêu cầu của bạn và lưu vào tệp tin [architect_plan.md](file:///C:/Users/letru/.gemini/antigravity-cli/scratch/architect_plan.md) trong thư mục workspace.

### Tóm tắt Kế hoạch Kỹ thuật:
1. **Phân tích yêu cầu**: Ảnh nền cần được cố định (`fixed`), còn nội dung văn bản và các thẻ giao diện cuộn bên trên một cách độc lập.
2. **Phương pháp thực hiện**: Đề xuất sử dụng thuộc tính CSS Pseudo-element (`body::before` và `body::after`) thay vì cài đặt trực tiếp lên `body`. Phương pháp này mang lại nhiều lợi ích:
   - **Độ linh hoạt cao**: Có thể điều chỉnh độ mờ (`opacity`), bộ lọc làm mờ (`blur`) của riêng ảnh nền mà không ảnh hưởng đến độ rõ nét của chữ bên trên.
   - **Tối ưu hóa độ tương phản**: Sử dụng lớp phủ màu tối (dark gradient overlay) thông qua `body::after` để đảm bảo văn bản sáng màu của giao diện Glassmorphism cực kỳ dễ đọc.
   - **Hiệu năng mượt mà**: Tránh hiện tượng giật lag khi cuộn trang (repaint lag) trên một số trình duyệt di động so với `background-attachment: fixed`.
3. **Các bước triển khai**:
   - Chọn ảnh nền trong thư mục [static_backup/images](file:///C:/Users/letru/.gemini/antigravity-cli/scratch/static_backup/images) (ví dụ: `cover.jpeg`).
   - Cập nhật quy tắc CSS cho thẻ `body` và định nghĩa pseudo-element trong tệp tin [style.css](file:///C:/Users/letru/.gemini/antigravity-cli/scratch/temp_workspace_files/style.css).
   - Kiểm tra hiển thị trên thiết bị di động và thiết lập ảnh màu nền dự phòng (fallback) phòng trường hợp mất kết nối mạng.

Bạn có thể tham khảo tệp tin đầy đủ tại đây: [architect_plan.md](file:///C:/Users/letru/.gemini/antigravity-cli/scratch/architect_plan.md).

