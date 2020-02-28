INSERT INTO public."TASA"(
            valor, nombre)
    VALUES (51.08, 'Tasa Ruta Península');
INSERT INTO public."TASA"(
            valor, nombre)
    VALUES (43.73, 'Tasa Ruta Canarias');
 INSERT INTO public."TASA"(
            valor, nombre)
    VALUES (18.72, 'Tasa Aproximación G1');
 INSERT INTO public."TASA"(
            valor, nombre)
    VALUES (16.84, 'Tasa Aproximación G2');
 INSERT INTO public."TASA"(
            valor, nombre)
    VALUES (14.04, 'Tasa Aproximación G3');


INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(3,'FIR/UIR Península');
INSERT INTO "TIPO_AREA" (cod_tasa, nombre) VALUES(1,'TMA G1');

INSERT INTO "EMPRESA" (nombre, id) VALUES ('Iberia', 'IBE');
INSERT INTO "AVION" (cod_empresa, id) VALUES(1,'AV-TEST');
INSERT INTO "AEROPUERTO" (nombre) VALUES('MAD');
INSERT INTO "AEROPUERTO" (nombre) VALUES('BAR');
INSERT INTO "VUELO" (cod_avion, peso, cod_origen, cod_destino) VALUES(1, 868000, 1, 2);

-- Desde aeropuerto madrid hasta barcelona del tirón
INSERT INTO "RUTA" (cod_vuelo, ts_inicio, ts_fin, altitud, tramo) VALUES(1, now(), now(), 20000, ST_MakeLine(ST_GeomFromText('POINT(40.4918100 -3.5694800)'),ST_GeomFromText('POINT(41.289182 2.0746423)')));
