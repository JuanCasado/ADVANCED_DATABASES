INSERT INTO "TASA"(valor, nombre) VALUES (51.08, 'Tasa Ruta Península');
INSERT INTO "TASA"(valor, nombre) VALUES (43.73, 'Tasa Ruta Canarias');
INSERT INTO "TASA"(valor, nombre) VALUES (18.72, 'Tasa Aproximación G1');
INSERT INTO "TASA"(valor, nombre) VALUES (16.84, 'Tasa Aproximación G2');
INSERT INTO "TASA"(valor, nombre) VALUES (14.04, 'Tasa Aproximación G3');

INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(1,'FIR/UIR Península');
INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(2,'FIR/UIR Canarias');
INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(3,'TMA G1');
INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(4,'TMA G2');
INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(5,'TMA G3');

INSERT INTO "EMPRESA" (nombre, id) VALUES ('IBERIA', 'IBE');
INSERT INTO "EMPRESA" (nombre, id) VALUES ('VUELING', 'VUE');
INSERT INTO "EMPRESA" (nombre, id) VALUES ('AIR CANADA', 'CAN');

INSERT INTO "AEROPUERTO" (nombre) VALUES('MADRID');
INSERT INTO "AEROPUERTO" (nombre) VALUES('LONDON');
INSERT INTO "AEROPUERTO" (nombre) VALUES('CANADA');
INSERT INTO "AEROPUERTO" (nombre) VALUES('CANARIAS');
INSERT INTO "AEROPUERTO" (nombre) VALUES('BARCELONA');

INSERT INTO "AVION" (cod_empresa, id) VALUES(1,'Airbus A321');
INSERT INTO "AVION" (cod_empresa, id) VALUES(3,'Boeing 767-300');
INSERT INTO "AVION" (cod_empresa, id) VALUES(2,'Airbus A320');
