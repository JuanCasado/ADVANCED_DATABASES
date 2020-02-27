package org.uah.mmaa.features.areas;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("Tasa")
public class Tasa implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    private Long codTasa;
    
    private String nombre;
    
    private Double valor;

    public Long getCodTasa()
    {
        return codTasa;
    }

    public void setCodTasa(Long codTasa)
    {
        this.codTasa = codTasa;
    }

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public Double getValor()
    {
        return valor;
    }

    public void setValor(Double valor)
    {
        this.valor = valor;
    }

}
