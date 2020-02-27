drop table auxiliar;
create temporary table auxiliar (nombre VARCHAR, cod_tipo_area BIGINT, altitud BIGINT, coordenadas varchar);

copy auxiliar
from './coordenadas.csv'
with (format csv);

INSERT INTO "AREA" (nombre, cod_tipo_area, altitud, frontera)
select nombre, cod_tipo_area, altitud, ST_GeometryFromText(coordenadas) from auxiliar;

drop table auxiliar;
