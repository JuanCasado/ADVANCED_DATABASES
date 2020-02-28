package org.uah.mmaa.features.areas;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("TipoArea")
public class TipoArea implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    private Long codTipoArea;
    
    private String nombre;
    
    private Tasa tasa;

    public Long getCodTipoArea()
    {
        return codTipoArea;
    }

    public void setCodTipoArea(Long codTipoArea)
    {
        this.codTipoArea = codTipoArea;
    }

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public Tasa getTasa()
    {
        return tasa;
    }

    public void setTasa(Tasa tasa)
    {
        this.tasa = tasa;
    }
}
