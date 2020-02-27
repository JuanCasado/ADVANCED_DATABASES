-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 9.5
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- -- ddl-end --
-- 

-- object: public."TASA_cod_tasa_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."TASA_cod_tasa_seq" CASCADE;
CREATE SEQUENCE public."TASA_cod_tasa_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."TASA_cod_tasa_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."TIPO_AREA_cod_tipo_area_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."TIPO_AREA_cod_tipo_area_seq" CASCADE;
CREATE SEQUENCE public."TIPO_AREA_cod_tipo_area_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."TIPO_AREA_cod_tipo_area_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."TASA" | type: TABLE --
-- DROP TABLE IF EXISTS public."TASA" CASCADE;
CREATE TABLE public."TASA" (
	cod_tasa bigint NOT NULL DEFAULT nextval('public."TASA_cod_tasa_seq"'::regclass),
	valor numeric NOT NULL,
	nombre varchar NOT NULL,
	descripcion smallint,
	CONSTRAINT "TASA_pk" PRIMARY KEY (cod_tasa)

);
-- ddl-end --
-- ALTER TABLE public."TASA" OWNER TO postgres;
-- ddl-end --

-- object: public."TIPO_AREA" | type: TABLE --
-- DROP TABLE IF EXISTS public."TIPO_AREA" CASCADE;
CREATE TABLE public."TIPO_AREA" (
	cod_tipo_area bigint NOT NULL DEFAULT nextval('public."TIPO_AREA_cod_tipo_area_seq"'::regclass),
	cod_tasa bigint NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar,
	CONSTRAINT "TIPO_AREA_pk" PRIMARY KEY (cod_tipo_area)

);
-- ddl-end --
-- ALTER TABLE public."TIPO_AREA" OWNER TO postgres;
-- ddl-end --

-- object: public."AREA_cod_area_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."AREA_cod_area_seq" CASCADE;
CREATE SEQUENCE public."AREA_cod_area_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."AREA_cod_area_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."EMPRESA_cod_empresa_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."EMPRESA_cod_empresa_seq" CASCADE;
CREATE SEQUENCE public."EMPRESA_cod_empresa_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."EMPRESA_cod_empresa_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."AVION_cod_avion_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."AVION_cod_avion_seq" CASCADE;
CREATE SEQUENCE public."AVION_cod_avion_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."AVION_cod_avion_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."VUELO_cod_vuelo_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."VUELO_cod_vuelo_seq" CASCADE;
CREATE SEQUENCE public."VUELO_cod_vuelo_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."VUELO_cod_vuelo_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."RUTA_cod_ruta_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."RUTA_cod_ruta_seq" CASCADE;
CREATE SEQUENCE public."RUTA_cod_ruta_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."RUTA_cod_ruta_seq" OWNER TO postgres;
-- ddl-end --

-- object: postgis | type: EXTENSION --
-- DROP EXTENSION IF EXISTS postgis CASCADE;
-- CREATE EXTENSION postgis
-- ;
-- ddl-end --

-- object: public."AREA" | type: TABLE --
-- DROP TABLE IF EXISTS public."AREA" CASCADE;
CREATE TABLE public."AREA" (
	cod_area bigint NOT NULL DEFAULT nextval('public."AREA_cod_area_seq"'::regclass),
	cod_tipo_area bigint NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar,
	frontera geometry NOT NULL,
	altitud bigint NOT NULL,
	CONSTRAINT "AREA_pk" PRIMARY KEY (cod_area)

);
-- ddl-end --
-- ALTER TABLE public."AREA" OWNER TO postgres;
-- ddl-end --

-- object: public."EMPRESA" | type: TABLE --
-- DROP TABLE IF EXISTS public."EMPRESA" CASCADE;
CREATE TABLE public."EMPRESA" (
	cod_empresa bigint NOT NULL DEFAULT nextval('public."EMPRESA_cod_empresa_seq"'::regclass),
	nombre varchar NOT NULL,
	id varchar NOT NULL,
	CONSTRAINT "EMPRESA_pk" PRIMARY KEY (cod_empresa)

);
-- ddl-end --
-- ALTER TABLE public."EMPRESA" OWNER TO postgres;
-- ddl-end --

-- object: public."AVION" | type: TABLE --
-- DROP TABLE IF EXISTS public."AVION" CASCADE;
CREATE TABLE public."AVION" (
	cod_avion bigint NOT NULL DEFAULT nextval('public."AVION_cod_avion_seq"'::regclass),
	cod_empresa bigint NOT NULL,
	id varchar NOT NULL,
	descripcion varchar,
	CONSTRAINT "AVION_pk" PRIMARY KEY (cod_avion)

);
-- ddl-end --
-- ALTER TABLE public."AVION" OWNER TO postgres;
-- ddl-end --

-- object: public."AEROPUERTO_cod_aeropuerto_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."AEROPUERTO_cod_aeropuerto_seq" CASCADE;
CREATE SEQUENCE public."AEROPUERTO_cod_aeropuerto_seq"
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public."AEROPUERTO_cod_aeropuerto_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."AEROPUERTO" | type: TABLE --
-- DROP TABLE IF EXISTS public."AEROPUERTO" CASCADE;
CREATE TABLE public."AEROPUERTO" (
	cod_aeropuerto bigint NOT NULL DEFAULT nextval('public."AEROPUERTO_cod_aeropuerto_seq"'::regclass),
	nombre varchar NOT NULL,
	CONSTRAINT "AEROPUERTO_pk" PRIMARY KEY (cod_aeropuerto)

);
-- ddl-end --
-- ALTER TABLE public."AEROPUERTO" OWNER TO postgres;
-- ddl-end --

-- object: public."VUELO" | type: TABLE --
-- DROP TABLE IF EXISTS public."VUELO" CASCADE;
CREATE TABLE public."VUELO" (
	cod_vuelo bigint NOT NULL DEFAULT nextval('public."VUELO_cod_vuelo_seq"'::regclass),
	cod_avion bigint NOT NULL,
	peso numeric NOT NULL,
	cod_origen bigint NOT NULL,
	cod_destino bigint NOT NULL,
	CONSTRAINT "VUELO_pk" PRIMARY KEY (cod_vuelo)

);
-- ddl-end --
-- ALTER TABLE public."VUELO" OWNER TO postgres;
-- ddl-end --

-- object: public."RUTA" | type: TABLE --
-- DROP TABLE IF EXISTS public."RUTA" CASCADE;
CREATE TABLE public."RUTA" (
	cod_ruta bigint NOT NULL DEFAULT nextval('public."RUTA_cod_ruta_seq"'::regclass),
	cod_vuelo bigint NOT NULL,
	altitud bigint NOT NULL,
	tramo geometry NOT NULL,
	CONSTRAINT "RUTA_pk" PRIMARY KEY (cod_ruta)

);
-- ddl-end --
-- ALTER TABLE public."RUTA" OWNER TO postgres;
-- ddl-end --

-- object: "TIPO_AREA_TASA_fk" | type: CONSTRAINT --
-- ALTER TABLE public."TIPO_AREA" DROP CONSTRAINT IF EXISTS "TIPO_AREA_TASA_fk" CASCADE;
ALTER TABLE public."TIPO_AREA" ADD CONSTRAINT "TIPO_AREA_TASA_fk" FOREIGN KEY (cod_tasa)
REFERENCES public."TASA" (cod_tasa) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "AREA_TIPO_AREA_fk" | type: CONSTRAINT --
-- ALTER TABLE public."AREA" DROP CONSTRAINT IF EXISTS "AREA_TIPO_AREA_fk" CASCADE;
ALTER TABLE public."AREA" ADD CONSTRAINT "AREA_TIPO_AREA_fk" FOREIGN KEY (cod_tipo_area)
REFERENCES public."TIPO_AREA" (cod_tipo_area) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "AVION_EMPRESA_fk" | type: CONSTRAINT --
-- ALTER TABLE public."AVION" DROP CONSTRAINT IF EXISTS "AVION_EMPRESA_fk" CASCADE;
ALTER TABLE public."AVION" ADD CONSTRAINT "AVION_EMPRESA_fk" FOREIGN KEY (cod_empresa)
REFERENCES public."EMPRESA" (cod_empresa) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "VUELO_AVION_fk" | type: CONSTRAINT --
-- ALTER TABLE public."VUELO" DROP CONSTRAINT IF EXISTS "VUELO_AVION_fk" CASCADE;
ALTER TABLE public."VUELO" ADD CONSTRAINT "VUELO_AVION_fk" FOREIGN KEY (cod_avion)
REFERENCES public."AVION" (cod_avion) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "VUELO_AEROPUERTO_ORIGEN_fk" | type: CONSTRAINT --
-- ALTER TABLE public."VUELO" DROP CONSTRAINT IF EXISTS "VUELO_AEROPUERTO_ORIGEN_fk" CASCADE;
ALTER TABLE public."VUELO" ADD CONSTRAINT "VUELO_AEROPUERTO_ORIGEN_fk" FOREIGN KEY (cod_origen)
REFERENCES public."AEROPUERTO" (cod_aeropuerto) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "VUELO_AEROPUERTO_DESTINO_fk" | type: CONSTRAINT --
-- ALTER TABLE public."VUELO" DROP CONSTRAINT IF EXISTS "VUELO_AEROPUERTO_DESTINO_fk" CASCADE;
ALTER TABLE public."VUELO" ADD CONSTRAINT "VUELO_AEROPUERTO_DESTINO_fk" FOREIGN KEY (cod_destino)
REFERENCES public."AEROPUERTO" (cod_aeropuerto) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "RUTA_AVION_fk" | type: CONSTRAINT --
-- ALTER TABLE public."RUTA" DROP CONSTRAINT IF EXISTS "RUTA_AVION_fk" CASCADE;
ALTER TABLE public."RUTA" ADD CONSTRAINT "RUTA_AVION_fk" FOREIGN KEY (cod_vuelo)
REFERENCES public."VUELO" (cod_vuelo) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


