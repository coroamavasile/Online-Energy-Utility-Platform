FROM maven:3.6.3-jdk-11 AS builder

COPY ./src/ /root/src
COPY ./pom.xml /root/
COPY ./checkstyle.xml /root/
WORKDIR /root
RUN mvn package
RUN java -Djarmode=layertools -jar /root/target/ds-2020-0.0.1-SNAPSHOT.jar list
RUN java -Djarmode=layertools -jar /root/target/ds-2020-0.0.1-SNAPSHOT.jar extract
RUN ls -l /root

FROM openjdk:11.0.6-jre

ENV TZ=UTC
ENV DB_IP=ec2-54-74-102-48.eu-west-1.compute.amazonaws.com
ENV DB_PORT=5432
ENV DB_USER=eprhrfdorxrvmo
ENV DB_PASSWORD=3a2e4ece0e43e72c413850949b8bf4ebe71574e6e31375ba64a755fe6bb7287f
ENV DB_DBNAME=d86q9tpmr52lln


COPY --from=builder /root/dependencies/ ./
COPY --from=builder /root/snapshot-dependencies/ ./

RUN sleep 10
COPY --from=builder /root/spring-boot-loader/ ./
COPY --from=builder /root/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher","-XX:+UseContainerSupport -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -Xms512m -Xmx512m -XX:+UseG1GC -XX:+UseSerialGC -Xss512k -XX:MaxRAM=72m"]


#FROM maven:3.6.3-jdk-11 AS builder
#
#COPY ./src/ /root/src
#COPY ./pom.xml /root/
#COPY ./checkstyle.xml /root/
#WORKDIR /root
#RUN mvn package
#RUN java -Djarmode=layertools -jar /root/target/ds-2020-0.0.1-SNAPSHOT.jar list
#RUN java -Djarmode=layertools -jar /root/target/ds-2020-0.0.1-SNAPSHOT.jar extract
#RUN ls -l /root
#
#FROM openjdk:11.0.6-jre
#
#ENV TZ=UTC
#ENV DB_IP=ec2-54-74-60-70.eu-west-1.compute.amazonaws.com
#ENV DB_PORT=5432
#ENV DB_USER=mbjgvtxpfezggp
#ENV DB_PASSWORD=a6417b667ebe76826ee2aa87208a404384a5899c2d4413f643a39a00983c7f8b
#ENV DB_DBNAME=de02m7bol9nhjv
#
#
#COPY --from=builder /root/dependencies/ ./
#COPY --from=builder /root/snapshot-dependencies/ ./
#
#RUN sleep 10
#COPY --from=builder /root/spring-boot-loader/ ./
#COPY --from=builder /root/application/ ./
#ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher","-XX:+UseContainerSupport -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -Xms512m -Xmx512m -XX:+UseG1GC -XX:+UseSerialGC -Xss512k -XX:MaxRAM=72m"]
