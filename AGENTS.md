# AGENTS.md — Team conventions cho ProjectManager runs

> File này được Agent Worker **copy vào root workspace** trước khi chạy `agy`. Nội dung được prepend vào mọi prompt. Giữ ngắn gọn, mang tính ràng buộc.
> Các skill chi tiết theo vai trò nằm trong `agents/` (architect, leader, coder, reviewer, qa).

## Bối cảnh

Workspace này được điều phối bởi **ProjectManager control plane**. Một phiên `agy` orchestrator duy nhất chạy cả pipeline; orchestrator (Leader) tự spin-up subagent native khi cần. Mọi trạng thái/báo cáo đi qua **MCP server** của control plane (cấu hình trong `server-mcp.json`).

## Quy trình bắt buộc (Plan → Build → Verify)

1. (Optional) **Architect** tạo plan chi tiết.
2. **Leader** chia plan thành task items → gọi MCP `update_tasks_md` (tạo `tasks.md` + TaskItems).
3. Với mỗi task item: **Coder** implement → **Reviewer** review → (Coder fix nếu `REVISION_NEEDED`) → **QA** verify → (Coder fix nếu `FAIL`) → đánh dấu `done`.
4. **Leader** kiểm tra cuối + tổng hợp → mở PR (không merge thẳng).
5. Approval gate / deploy do Worker xử lý sau khi nhận report.

## MCP tools — BẮT BUỘC dùng để báo cáo (không in ra stdout thay thế)

| Tool | Khi gọi |
|---|---|
| `get_assigned_task`, `get_project_context` | Đầu run, lấy task & context |
| `update_tasks_md` | Leader sau khi chia task |
| `report_progress` | Mỗi khi chuyển bước / có cập nhật đáng kể (kèm tokens/cost nếu biết) |
| `mark_task_item` | Đổi trạng thái item: pending/coding/review/qa/done/failed |
| `report_review_result` | Reviewer — verdict `APPROVED` \| `REVISION_NEEDED` + notes |
| `report_qa_result` | QA — verdict `PASS` \| `FAIL` + notes |
| `report_run_complete` | Leader cuối run — status + prUrl + summary + tokens + cost |

**Control signal**: verdict phải gửi **qua MCP tool dạng cấu trúc**, KHÔNG để Worker parse văn bản tự do.

## Guardrails (bắt buộc)

- **MAX_ITERATIONS = 3** cho vòng Coder↔Reviewer và Coder↔QA mỗi task item. Chạm trần → `mark_task_item failed` + ghi lý do, KHÔNG lặp vô hạn.
- **Reflection trước mỗi retry**: trả lời ngắn 3 câu — "Cái gì fail? Thay đổi cụ thể nào sẽ fix? Mình có đang lặp lại cùng cách không?" rồi mới sửa.
- **Isolation**: mỗi task item làm việc trong **worktree/branch riêng** (`task/<runId>/<seq>`); KHÔNG sửa file của item khác để tránh đụng độ.
- **Scope**: chỉ thay đổi những gì task yêu cầu; không refactor lan man, không đụng file không liên quan.

## Git & bảo mật

- Branch theo task item; commit nhỏ, **Conventional Commits** (`feat:`, `fix:`, `test:`…).
- **Mở PR, KHÔNG merge/force-push vào nhánh chính.**
- TUYỆT ĐỐI không in/log PAT, token, secret. Không sửa file CI/secret trừ khi task yêu cầu rõ.

## Definition of Done (mỗi task item)

- Code build pass + test liên quan xanh.
- Reviewer `APPROVED` và QA `PASS`.
- `mark_task_item done` đã gọi.

## Memory & Custom Deployment

- **Đọc Context (Bắt buộc)**: Trước khi bắt đầu thực hiện bất kỳ task nào, agent BẮT BUỘC phải đọc file `memory.md` tại thư mục gốc của dự án (nếu có) để hiểu rõ bối cảnh (context), cấu trúc cơ sở dữ liệu, các API hiện có và các lưu ý đặc biệt.
- **Cập nhật Memory (Bắt buộc)**: Sau khi hoàn thành xong task, Leader Agent phối hợp với các subagents BẮT BUỘC phải cập nhật (hoặc tạo mới) file `memory.md` tại thư mục gốc của dự án. Nội dung cập nhật phải ghi nhận chi tiết:
  1. Cấu trúc thư mục/tệp tin mới được tạo hoặc chỉnh sửa quan trọng.
  2. Bất kỳ thay đổi nào liên quan đến cơ sở dữ liệu (thêm bảng, thêm cột mới, quan hệ khóa ngoại...).
  3. Các API/Service/Route mới được xây dựng và cách hoạt động của chúng.
  4. Những bài học kinh nghiệm, lưu ý quan trọng để tối ưu hóa hiệu năng và tránh lỗi cho các task chạy sau.
- **Custom Deployment**: Đối với các dự án có cơ chế deploy riêng (ví dụ: chạy script deploy như `deploy.ps1`), agent cần dựa vào thông tin từ mã nguồn, hướng dẫn trong `memory.md`, v.v. để thực hiện deploy một cách chính xác và phù hợp nhất.

## Tránh Treo Tiến Trình & Chạy Mượt Mà (Anti-Hang & Robust Execution)

- **Ngăn ngừa Lặp vô hạn**: Mọi vòng lặp logic (đặc biệt trong các tác vụ nền, xử lý hàng đợi, hoặc các bài test chạy thử) phải có cơ chế giới hạn số lần lặp tối đa cứng hoặc kiểm tra `CancellationToken` liên tục.
- **Không sử dụng lệnh Chặn tương tác (Blocking I/O)**: Tuyệt đối KHÔNG viết mã nguồn hoặc Unit Tests chứa các lệnh chờ người dùng nhập dữ liệu từ bàn phím (như `Console.ReadLine()`, `Console.ReadKey()`, `prompt()`, `stdin.read()`).
- **HttpClient Timeout**: Phải luôn thiết lập một `Timeout` hợp lý khi tạo hoặc sử dụng HttpClient (ví dụ: `Timeout = TimeSpan.FromSeconds(30)`).
- **Giới hạn thời gian Test**: Khi chạy test thông qua Bash, luôn sử dụng tham số giới hạn thời gian của test runner (ví dụ: `dotnet test -- MSTest.DeploymentCleanupTimeout=60000` hoặc đặt timeout cụ thể của runner) để tránh việc một bài test bị treo làm kẹt toàn bộ tiến trình.
- **Tự động Phục hồi khi Resume Run**: Khi Leader agent khôi phục chạy tiếp một run bị gián đoạn (`loopCount > 1`), Leader phải sử dụng thông tin danh sách task từ MCP `get_run_items_status`. Tuyệt đối không được định nghĩa lại plan hoặc gọi `update_tasks_md` ghi đè danh sách task, điều này sẽ làm reset các task đã `Done` về `Coding`.
- **Xử lý Sự cố Truy cập Git (Git 403 / Access Denied)**: Nếu gặp lỗi quyền truy cập kho lưu trữ Git (`exit code 128`, `403 Access denied`), Leader và Coder cần kiểm tra lại token cá nhân (PAT) được lấy từ `get_project_context` và đảm bảo remote URL chứa đúng PAT.
- **Cập nhật Tiến độ Realtime (Anti-Silent Hang)**: Để người dùng biết agent vẫn hoạt động ổn định và không bị treo ở bước kiểm thử/testing, Coder và QA phải gọi `report_progress` liên tục trước và sau các lệnh tốn thời gian (build, test, deploy).
