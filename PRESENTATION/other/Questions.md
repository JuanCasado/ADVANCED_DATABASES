---
title: Preguntas sobre Cassandra
date: March 12, 2020
author:
  - Juan Casado Ballesteros
  - Gino Cocolo Rodriguez
---

Preguntas sobre el trabajo teórico de Cassandra realizado por Mónica Calderón Sánchez y Álvaro Vlad Azpeitia para la asignatura optativa modelos avanzados de bases de datos.

## Lista de preguntas

* Existe alguna limitación para reducir o aumentar el número de nodos pertenecientes a la base de datos?
* Se tienen en cuenta las características de la máquina sobre la que se ejecutan los nodos, es decir, podría agregarse un nodo ejecutándose sobre una máquina sin almacenamiento permanente pero con mucha potencia de cómputo o uno con mucho almacenamiento permanente pero con capacidad computacional reducida de modo que se aprovechen las características de cada máquina?
* En una base de datos con múltiples nodos cada uno en un equipo con distintas características de almacenamiento y cómputo, cuál es la capacidad máxima de la base de datos? la suma del almacenamiento de los nodos, la del nodo con menor capacidad...
* Cantidad máxima de nodos caídos de forma simultánea?, cuándo comenzará a perderse información?
* Diferencias entre DataStax y Cassandra, cuándo es mejor utilizar Cassandra de forma aislada y cuándo es mejor hacerlo mediante DataStax?
* Es Cassandra una solución adecuada para almacenar grandes cantidades de datos (blobs)?
