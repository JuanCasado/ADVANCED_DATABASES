package org.uah.mmaa.features.aviones;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.uah.mmaa.features.areas.Area;

@Mapper
public interface AvionMapper
{
    public List<Area> fetchAviones();
    
    public List<Vuelo> fetchVuelos(Long codAvion);
    
    public Ruta getRuta(Long codVuelo);
    
    public List<Concepto> getConceptos(Ruta ruta);
    
    public Vuelo getVuelo(Long codVuelo);
}
