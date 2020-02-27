package org.uah.mmaa.features.aviones;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("Avion")
public class Avion implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Long codAvion;

    private String id;

    private String descripcion;

    public Long getCodAvion()
    {
        return codAvion;
    }

    public void setCodAvion(Long codAvion)
    {
        this.codAvion = codAvion;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getDescripcion()
    {
        return descripcion;
    }

    public void setDescripcion(String descripcion)
    {
        this.descripcion = descripcion;
    }
}
