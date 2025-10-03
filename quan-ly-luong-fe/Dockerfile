# Stage 1: Build ứng dụng React
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code và build
COPY . .
RUN npm run build

# Stage 2: Phục vụ các file tĩnh bằng Nginx
FROM nginx:stable-alpine

# Copy các file đã build từ stage 1 vào thư mục mặc định của Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port mặc định của Nginx
EXPOSE 80

# Lệnh để khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]