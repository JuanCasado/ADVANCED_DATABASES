package org.uah.mmaa.features.aviones;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;
import org.uah.mmaa.features.areas.TipoArea;

@Alias("Concepto")
public class Concepto implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    private TipoArea tipoArea;

    private Double recorrido;

    public Double getRecorrido()
    {
        return recorrido;
    }

    public void setRecorrido(Double recorrido)
    {
        this.recorrido = recorrido;
    }

    public TipoArea getTipoArea()
    {
        return tipoArea;
    }

    public void setTipoArea(TipoArea tipoArea)
    {
        this.tipoArea = tipoArea;
    }
}
