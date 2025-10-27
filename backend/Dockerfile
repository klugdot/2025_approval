# 1) Build stage
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

# Maven 캐시 최적화
COPY pom.xml .
RUN mvn -B dependency:go-offline

# 소스 복사 후 빌드
COPY src ./src
RUN mvn -B clean package -DskipTests

# 2) Run stage
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
