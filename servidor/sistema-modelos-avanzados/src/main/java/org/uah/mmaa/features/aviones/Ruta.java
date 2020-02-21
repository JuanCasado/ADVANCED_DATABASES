package org.uah.mmaa.features.aviones;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

@Alias("Ruta")
public class Ruta implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    private Long codRuta;
    
    private String tramo;
    
    private LocalDateTime tsInicio;
    
    private LocalDateTime tsFin;
    
    private Avion avion;

    public Long getCodRuta()
    {
        return codRuta;
    }

    public void setCodRuta(Long codRuta)
    {
        this.codRuta = codRuta;
    }

    public String getTramo()
    {
        return tramo;
    }

    public void setTramo(String tramo)
    {
        this.tramo = tramo;
    }

    public LocalDateTime getTsInicio()
    {
        return tsInicio;
    }

    public void setTsInicio(LocalDateTime tsInicio)
    {
        this.tsInicio = tsInicio;
    }

    public LocalDateTime getTsFin()
    {
        return tsFin;
    }

    public void setTsFin(LocalDateTime tsFin)
    {
        this.tsFin = tsFin;
    }

    public Avion getAvion()
    {
        return avion;
    }

    public void setAvion(Avion avion)
    {
        this.avion = avion;
    }
    
    
}
