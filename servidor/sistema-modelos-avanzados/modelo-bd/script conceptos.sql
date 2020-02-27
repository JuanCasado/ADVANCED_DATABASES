select a.cod_area, a.nombre, ta.cod_tipo_area, ta.nombre, t.valor,
	sum(st_length(st_intersection(r.tramo, a.frontera)::geography)) / 1000
FROM "RUTA" r, "AREA" a
LEFT JOIN "TIPO_AREA" ta USING(cod_tipo_area)
LEFT JOIN "TASA" t USING(cod_tasa)
WHERE st_intersects(r.tramo, a.frontera) AND ((t.cod_tasa > 2 AND r.altitud < a.altitud) OR t.cod_tasa < 3)
GROUP BY cod_area, a.nombre, ta.cod_tipo_area, t.valor