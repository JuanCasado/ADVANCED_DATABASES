package org.uah.mmaa.features.usuarios;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("Perfil")
public class Perfil implements Serializable
{
    private static final long serialVersionUID = 1L;

    private String nombre;

    private String email;
    
    private RolUsuario rol;

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public RolUsuario getRol()
    {
        return rol;
    }

    public void setRol(RolUsuario rol)
    {
        this.rol = rol;
    }
}