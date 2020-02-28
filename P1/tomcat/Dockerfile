FROM tomcat:8.5.51-jdk11-openjdk

MAINTAINER advancedtomcat
COPY ./sistema-modelos-avanzados.war /usr/local/tomcat/webapps/
COPY ./sample.war /usr/local/tomcat/webapps/

CMD ["catalina.sh", "run"]