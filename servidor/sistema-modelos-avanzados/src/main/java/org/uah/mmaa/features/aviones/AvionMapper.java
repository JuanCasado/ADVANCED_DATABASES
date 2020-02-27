package org.uah.mmaa.features.aviones;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.uah.mmaa.features.areas.Area;

@Mapper
public interface AvionMapper
{
    public List<Area> fetchAviones();
    
    public List<Vuelo> fetchVuelosAvion(Long codAvion);
    
    public List<Vuelo> fetchVuelos();
    
    public Ruta getRuta(Long codVuelo);
    
    public List<Concepto> getConceptos(Long codVuelo);
    
    public List<Concepto> getConceptosDesagrupados(Long codVuelo);
    
    public Vuelo getVuelo(Long codVuelo);
}
