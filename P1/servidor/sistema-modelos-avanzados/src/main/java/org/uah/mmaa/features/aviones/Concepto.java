package org.uah.mmaa.features.aviones;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;
import org.uah.mmaa.features.areas.Area;

@Alias("Concepto")
public class Concepto implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Area area;

    private Double recorrido;
    
    private Double costeCalculado;

    public Double getRecorrido()
    {
        return recorrido;
    }

    public void setRecorrido(Double recorrido)
    {
        this.recorrido = recorrido;
    }

    public Area getArea()
    {
        return area;
    }

    public void setArea(Area area)
    {
        this.area = area;
    }

    public Double getCosteCalculado()
    {
        return costeCalculado;
    }

    public void setCosteCalculado(Double costeCalculado)
    {
        this.costeCalculado = costeCalculado;
    }
}
