
# Hadoop stack

Using Hadoop 3.2.1 over debian 9 with JDK-8.
The stack deploys a multi node hadoop with the following components installed.

* Flume
* HBase 2.2.4
* Pig 0.17.0
* Hive 3.1.2
* PostgreSQL 12.2.0
* Zookeeper 3.6.0

## Setup

Before stating the compose or the swarm deployment the base container needs to be created.
This can be done by running:

```bash
docker build base -t hadoop-base:latest
```

Then the rest of the images can be built with:

```bash
docker-compose build
```

This last step is optional but recommended for Compose deployment but mandatory for Swarm.

## Hadoop Compose single node

A fixed sized multi node node hadoop installation with just a single node.
Easy to use, manage and deploy with docker-compose.
New node managers or data nodes can be added manually to create a new fixed size deployment (not recommend, instead use swarm).

**Do not start both swarm and compose at the same time, namespaces may collide.**

### Starting containers

```bash
  docker-compose up
```

### Stopping the containers

```bash
  ^C
  docker-compose down
```

## Hadoop Swarm multi node

The full multi node hadoop potential is unleashed.
Each component can be replicated which will extend the number of instances of data nodes and node managers.

### Starting swarm

This will build the images needed for the swarm.
Also the containers can be build manually before starting the swarm.

```bash
./swarm up
```

### Stopping swarm

```bash
./swarm down
```

## Accessing services

* Namenode: [http://localhost:9870/dfshealth.html#tab-overview](http://localhost:9870/dfshealth.html#tab-overview)
* History server: [http://localhost:8188/applicationhistory](http://localhost:8188/applicationhistory)
* Datanode: [http://localhost:9864/](http://localhost:9864/)
* Nodemanager: [http://localhost:8042/node](http://localhost:8042/node)
* Resource manager: [http://localhost:8088/](http://localhost:8088/)
* HBase: [http://localhost:16010/master-status](http://localhost:16010/master-status)

## Configuring hadoop

The available configurations are:

* /etc/hadoop/core-site.xml CORE_CONF
* /etc/hadoop/hdfs-site.xml HDFS_CONF
* /etc/hadoop/yarn-site.xml YARN_CONF
* /etc/hadoop/httpfs-site.xml HTTPFS_CONF
* /etc/hadoop/kms-site.xml KMS_CONF
* /etc/hadoop/mapred-site.xml  MAPRED_CONF

If you need to extend some other configuration file, refer to base/entrypoint.sh bash script.


CREATE TABLE hbase_table_1(key int, value string)
STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler'
WITH SERDEPROPERTIES ("hbase.columns.mapping" = ":key,cf1:val")
TBLPROPERTIES ("hbase.table.name" = "xyz");
