package org.uah.mmaa.features.aviones;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.uah.mmaa.features.areas.Area;

@RestController
@RequestMapping("avion")
public class AvionController
{
    @Autowired
    private AvionService avionService;
    
    @GetMapping
    public List<Area> getAviones()
    {
        return avionService.fetchAviones();
    }
    
    @GetMapping("/vuelos")
    public List<Vuelo> getVuelos(@RequestParam Long codAvion)
    {
        return avionService.fetchVuelos(codAvion);
    }
    
    @GetMapping("/calculo")
    public Calculo getCalculoVuelo(@RequestParam Long codVuelo)
    {
        return avionService.calcularCosteVuelo(codVuelo);
    }
    
    @GetMapping("/vuelos/ruta")
    public Ruta getRuta(@RequestParam Long codVuelo)
    {
        return avionService.getRuta(codVuelo);
    }
}
