package org.uah.mmaa.features.areas;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("Area")
public class Area implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Long codArea;

    private String nombre;

    private String frontera;

    private TipoArea tipoArea;

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public String getFrontera()
    {
        return frontera;
    }

    public void setFrontera(String frontera)
    {
        this.frontera = frontera;
    }

    public Long getCodArea()
    {
        return codArea;
    }

    public void setCodArea(Long codArea)
    {
        this.codArea = codArea;
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
