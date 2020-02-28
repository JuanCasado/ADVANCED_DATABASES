package org.uah.mmaa.features.aviones;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("Vuelo")
public class Vuelo implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    private Long codVuelo;
    
    private Avion avion;
    
    private String identificador;
    
    private Long peso;
    
    private String origen;
    
    private String destino;

    public Long getCodVuelo()
    {
        return codVuelo;
    }

    public void setCodVuelo(Long codVuelo)
    {
        this.codVuelo = codVuelo;
    }

    public Avion getAvion()
    {
        return avion;
    }

    public void setAvion(Avion avion)
    {
        this.avion = avion;
    }

    public String getIdentificador()
    {
        return identificador;
    }

    public void setIdentificador(String identificador)
    {
        this.identificador = identificador;
    }

    public Long getPeso()
    {
        return peso;
    }

    public void setPeso(Long peso)
    {
        this.peso = peso;
    }

    public String getOrigen()
    {
        return origen;
    }

    public void setOrigen(String origen)
    {
        this.origen = origen;
    }

    public String getDestino()
    {
        return destino;
    }

    public void setDestino(String destino)
    {
        this.destino = destino;
    }
    
    
}
