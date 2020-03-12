---
title: Cassandra questions
date: March 12, 2020
author:
  - Juan Casado Ballesteros
  - Gino Cocolo Rodriguez
---

Preguntas sobre el trabajo teórico de Cassandra realizado por Mónica Calderón Sánchez y Álvaro Vlad Azpeitia para la asignatura optativa modelos avanzados de bases de datos.

## Lista de preguntas

* Existe alguna limitación para reducir el número de nodos pertenecientes a la base de datos?
* Existe alguna limitación para aumentar el número de nodos pertenecientes a la base de datos?
* Se tienen en cuenta las características de la máquina sobre la que se ejecutan los nodos, es decir, podría agregarse un nodo ejecutándose sobre una máquina sin     almacenamiento permanente pero con mucha potencia de cómputo o uno con mucho almacenamiento permanente pero con capacidad computacional reducidas y seguir pudiendo ser aprovechado sin ralentizar al sistema?
* En una base de datos con múltiples nodos cada uno en un equipo con distintas características de almacenamiento y cómputo cual es la capacidad máxima de la base de datos? la suma del almacenamiento de los nodos, la del nodo con menor capacidad...
* Existen limitaciones del números de nodos caídos por causas no previstas por la base de datos?, cantidad de nodos deshabilitados de forma simultánea en un periodo límite.
* Diferencias entre DataStax y Cassandra, cuando es mejor utilizar Cassandra de forma aislada y cuando es mejor hacerlo mediante DataStax.
* Es Cassandra una solución adecuada para almacenar grandes cantidades de datos (blobs)?
