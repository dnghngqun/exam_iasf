# Stage 1: Build the application with Maven and JDK 17
# CORRECTION: Use a base image that includes Maven and JDK 17
FROM maven:3.9-amazoncorretto-17-alpine AS builder

WORKDIR /app

# Copy pom.xml and download dependencies to leverage Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire source code and build
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Run the application with a JRE
# This stage is correct and can remain the same
FROM amazoncorretto:17-alpine

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Command to start the application
ENTRYPOINT ["java", "-jar", "app.jar"]