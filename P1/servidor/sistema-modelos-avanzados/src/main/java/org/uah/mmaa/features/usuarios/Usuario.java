package org.uah.mmaa.features.usuarios;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import com.google.gson.annotations.Expose;

@Alias("Usuario")
public class Usuario implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Long codUsuario;

    @Expose
    private String pwdCifrada;

    private LocalDateTime fechaAlta;

    private LocalDateTime fechaBaja;

    private Perfil perfil;

    public Long getCodUsuario()
    {
        return codUsuario;
    }

    public void setCodUsuario(Long codUsuario)
    {
        this.codUsuario = codUsuario;
    }

    public String getPwdCifrada()
    {
        return pwdCifrada;
    }

    public void setPwdCifrada(String pwdCifrada)
    {
        this.pwdCifrada = pwdCifrada;
    }

    public LocalDateTime getFechaAlta()
    {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDateTime fechaAlta)
    {
        this.fechaAlta = fechaAlta;
    }

    public LocalDateTime getFechaBaja()
    {
        return fechaBaja;
    }

    public void setFechaBaja(LocalDateTime fechaBaja)
    {
        this.fechaBaja = fechaBaja;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((codUsuario == null) ? 0 : codUsuario.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Usuario other = (Usuario) obj;
        if (codUsuario == null)
        {
            if (other.codUsuario != null)
                return false;
        }
        else if (!codUsuario.equals(other.codUsuario))
            return false;
        return true;
    }

    public Perfil getPerfil()
    {
        return perfil;
    }

    public void setPerfil(Perfil perfil)
    {
        this.perfil = perfil;
    }

}
