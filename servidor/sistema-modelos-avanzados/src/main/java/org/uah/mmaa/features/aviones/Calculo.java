package org.uah.mmaa.features.aviones;

import java.util.List;

public class Calculo
{
    private List<Concepto> conceptos;

    private Double total;

    public List<Concepto> getConceptos()
    {
        return conceptos;
    }

    public void setConceptos(List<Concepto> conceptos)
    {
        this.conceptos = conceptos;
    }

    public Double getTotal()
    {
        return total;
    }

    public void setTotal(Double total)
    {
        this.total = total;
    }
}
