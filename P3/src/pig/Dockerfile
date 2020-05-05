
ARG REGISTRY=""
FROM ${REGISTRY}hadoop-base:latest

ENV PIG_VERSION=0.17.0

RUN curl -LO http://apache.uvigo.es/pig/pig-$PIG_VERSION/pig-$PIG_VERSION.tar.gz && \
  tar xzf pig-$PIG_VERSION.tar.gz

ENV PATH $PATH:/pig-$PIG_VERSION/bin

RUN apt-get update && apt-get install -y wget procps
ENV PIGLIBS=/pig-libs

RUN mkdir /pig-libs && \
	wget https://repo1.maven.org/maven2/org/apache/zookeeper/zookeeper/3.4.10/zookeeper-3.4.10.jar -O $PIGLIBS/zookeeper-3.4.10.jar && \
  wget https://repo1.maven.org/maven2/com/twitter/elephantbird/elephant-bird-pig/4.17/elephant-bird-pig-4.17.jar -O $PIGLIBS/elephant-bird-pig-4.17.jar && \
	wget https://repo1.maven.org/maven2/com/twitter/elephantbird/elephant-bird-hadoop-compat/4.17/elephant-bird-hadoop-compat-4.17.jar -O $PIGLIBS/elephant-bird-hadoop-compat-4.17.jar && \
	wget https://repo1.maven.org/maven2/com/twitter/elephantbird/elephant-bird-core/4.17/elephant-bird-core-4.17.jar -O $PIGLIBS/elephant-bird-core-4.17.jar && \
	wget https://repo1.maven.org/maven2/com/twitter/elephantbird/elephant-bird-cascading-protobuf/4.17/elephant-bird-cascading-protobuf-4.17.jar -O $PIGLIBS/elephant-bird-cascading-protobuf-4.17.jar
ADD pig-twitter-udfs-1.0-SNAPSHOT.jar /pig-libs

ENV HBASE_VERSION 2.2.4
ENV HBASE_HOME=/opt/hbase-$HBASE_VERSION
ENV HBASE_URL http://www.apache.org/dist/hbase/$HBASE_VERSION/hbase-$HBASE_VERSION-bin.tar.gz
RUN set -x \
    && curl -fSL "$HBASE_URL" -o /tmp/hbase.tar.gz \
    && curl -fSL "$HBASE_URL.asc" -o /tmp/hbase.tar.gz.asc \
    && tar -xvf /tmp/hbase.tar.gz -C /opt/ \
    && rm /tmp/hbase.tar.gz*

RUN apt-get --purge remove -y wget && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/hbase/conf
ENV CLASSPATH $CLASSPATH:/etc/hadoop
ENV PIG_CLASSPATH=$PIG_CLASSPATH:/etc/hadoop
COPY hbase-site.xml /etc/hadoop

RUN mkdir /scripts
ADD scripts/* /scripts