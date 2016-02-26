FROM java:8
COPY target/api-gateway.jar /opt
WORKDIR /opt
CMD ["java", "-jar", "api-gateway.jar"]
EXPOSE 8080
