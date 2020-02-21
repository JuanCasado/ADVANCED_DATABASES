package org.uah.mmaa.features.aviones;

import java.util.List;

import org.uah.mmaa.features.areas.Area;

public interface AvionService
{

    public List<Area> fetchAviones();
    
    public List<Vuelo> fetchVuelos(Long codAvion);

    public Calculo calcularCosteVuelo(Long codVuelo);

    public Ruta getRuta(Long codVuelo);
}
