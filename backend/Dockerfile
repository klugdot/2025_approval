# === 1단계: 빌드 단계 ===
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# 소스 복사 후 빌드
COPY . .
RUN mvn clean package -DskipTests

# === 2단계: 실행 단계 ===
FROM eclipse-temurin:17-jre
WORKDIR /app

# 빌드된 jar 파일 복사 (target 폴더 안의 jar 이름 자동 인식)
COPY --from=build /app/target/*.jar app.jar

# Render에서 접근할 포트
EXPOSE 8080

# 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]
