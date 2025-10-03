# Hệ thống Quản lý Lương

Dự án quản lý lương với kiến trúc full-stack sử dụng Spring Boot (Backend) và React (Frontend).

## 🚀 Cách chạy dự án với Docker

### Yêu cầu

- Cài đặt Docker và Docker Compose trên máy

### Chạy dự án

1. **Clone hoặc mở thư mục dự án**

   ```bash
   cd exam_iasf
   ```

2. **Khởi chạy toàn bộ hệ thống**

   ```bash
   docker-compose up --build
   ```

3. **Chờ các service khởi động** (khoảng 2-3 phút)

   - Database sẽ khởi động trước
   - Backend sẽ kết nối database và khởi động
   - Frontend sẽ khởi động cuối cùng

4. **Truy cập ứng dụng**
   - **Frontend (React)**: http://localhost:3000
   - **Backend API**: http://localhost:8080
   - **Database**: localhost:5433 (PostgreSQL)
   - **Swagger**: http://localhost:8080/swagger-ui.html

### Dừng dự án

```bash
docker-compose down
```

### Xóa toàn bộ (bao gồm dữ liệu)

```bash
docker-compose down -v
```

## 📋 Thông tin kết nối

### Database

- **Host**: localhost
- **Port**: 5433
- **Database**: exam_iasf
- **Username**: admin
- **Password**: 207205

### Các cổng dịch vụ

- **Frontend**: 3000
- **Backend**: 8080
- **Database**: 5433

## 🔧 Khắc phục sự cố

1. **Nếu port bị xung đột**: Thay đổi port trong file `docker-compose.yml`
2. **Nếu build lỗi**: Chạy `docker-compose down` rồi `docker-compose up --build` lại
3. **Nếu database lỗi**: Chạy `docker-compose down -v` để xóa data cũ

## 🧪 Testing

Sau khi khởi động thành công, bạn có thể test:

- Truy cập http://localhost:3000 để sử dụng giao diện
- Test API trực tiếp tại http://localhost:8080
