package org.uah.mmaa.features.aviones;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.uah.mmaa.features.areas.Area;

@Service
@Transactional
public class AvionServiceImpl implements AvionService
{
    @Autowired
    private AvionMapper avionMapper;

    @Override
    public List<Area> fetchAviones()
    {
        return avionMapper.fetchAviones();
    }

    @Override
    public List<Vuelo> fetchVuelos()
    {
        return avionMapper.fetchVuelos();
    }

    @Override
    public List<Vuelo> fetchVuelosAvion(Long codAvion)
    {
        return avionMapper.fetchVuelosAvion(codAvion);
    }

    @Override
    public Calculo calcularCosteVuelo(Long codVuelo, Boolean desagrupado)
    {
        List<Concepto> conceptos = avionMapper.getConceptos(codVuelo);
        
        if (desagrupado)
            conceptos = avionMapper.getConceptosDesagrupados(codVuelo);
        else
            conceptos = avionMapper.getConceptos(codVuelo);
        
        Vuelo vuelo = avionMapper.getVuelo(codVuelo);
        Calculo calculo = new Calculo();
        calculo.setConceptos(conceptos);
        Double total = 0D;
        
        for (Concepto concepto : conceptos)
        {
            if (concepto.getArea().getTipoArea().getTasa().getCodTasa() < 3L)
                total += calculoParcialRuta(concepto, vuelo);
            else
                total += calculoParcialAproximacion(concepto, vuelo);
        }

        calculo.setTotal(total);

        return calculo;
    }

    @Override
    public Ruta getRuta(Long codVuelo)
    {
        return avionMapper.getRuta(codVuelo);
    }

    private Double calculoParcialAproximacion(Concepto concepto, Vuelo vuelo)
    {
        Double tasaFija = concepto.getArea().getTipoArea().getTasa().getValor();
        Long peso = vuelo.getPeso();

        Double unidadesServicio = Math.pow(peso / 50, 0.7);

        Double parcial = tasaFija * unidadesServicio;

        concepto.setCosteCalculado(parcial);

        return parcial;
    }

    private Double calculoParcialRuta(Concepto concepto, Vuelo vuelo)
    {
        Double tasaFija = concepto.getArea().getTipoArea().getTasa().getValor();
        Double coefDistancia = concepto.getRecorrido() / 100;

        Double parcial = tasaFija * coefDistancia;

        concepto.setCosteCalculado(parcial);

        return parcial;
    }

}
