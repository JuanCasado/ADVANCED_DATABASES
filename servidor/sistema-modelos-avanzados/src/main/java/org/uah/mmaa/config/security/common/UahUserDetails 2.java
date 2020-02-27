package org.uah.mmaa.config.security.common;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.uah.mmaa.features.usuarios.Usuario;


public class UahUserDetails implements UserDetails
{
    private static final long serialVersionUID = 1L;

    private final String email;

    private final String password;

    private List<SimpleGrantedAuthority> authorities;

    private Usuario usuario;

    public UahUserDetails(final Usuario usuario)
    {
        List<SimpleGrantedAuthority> auth = new ArrayList<>();
        auth.add(new SimpleGrantedAuthority(usuario.getPerfil().getRol().name()));

        authorities = auth;

        password = usuario.getPwdCifrada();
        email = usuario.getPerfil().getEmail();

        setUsuario(usuario);
    }

    public Usuario getUsuario()
    {
        return usuario;
    }

    public void setUsuario(Usuario usuario)
    {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return authorities;
    }

    @Override
    public String getUsername()
    {
        return email;
    }

    @Override
    public String getPassword()
    {
        return password;
    }

    @Override
    public boolean isAccountNonExpired()
    {
        return true;
    }

    @Override
    public boolean isAccountNonLocked()
    {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired()
    {
        return true;
    }

    @Override
    public boolean isEnabled()
    {
        return true;
    }
}
