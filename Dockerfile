FROM openjdk:17-jdk-buster
  
ENV TOMCAT_VERSION 9.0.50

# Tomcat 설치
RUN apt-get update && apt-get install -y vim && \
    mkdir -p /opt/tomcat && \
    wget -O tomcat.tar.gz https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.50/bin/apache-tomcat-9.0.50.tar.gz && \
    tar xvfz tomcat.tar.gz -C /opt/tomcat --strip-components=1


# vintageBlue.war 파일을 컨테이너 내의 특정
COPY my-app/VintageBlue.war /opt/tomcat/webapps/

# Tomcat 사용자와 그룹을 생성
RUN /bin/bash -c 'groupadd -r tomcat && useradd -g tomcat -d /opt/tomcat -s /bin/bash tomcat && \
    chown -R tomcat:tomcat /opt/tomcat && chmod -R 750 /opt/tomcat'

USER tomcat
WORKDIR /opt/tomcat/bin

EXPOSE 8080
CMD ["./catalina.sh", "run"]
