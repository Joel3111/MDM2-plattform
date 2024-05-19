FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /usr/src/app

# Copy project files to the working directory
COPY . .

# Install dependencies and package the application
RUN ./mvnw -Dmaven.test.skip=true package

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "/usr/src/app/target/plattform-0.0.1-SNAPSHOT.jar"]
