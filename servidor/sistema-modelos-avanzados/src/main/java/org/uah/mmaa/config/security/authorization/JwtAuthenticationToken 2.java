package org.uah.mmaa.config.security.authorization;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.uah.mmaa.features.usuarios.Usuario;


public class JwtAuthenticationToken extends AbstractAuthenticationToken
{
    private static final long serialVersionUID = 2877954820905567501L;

    private String token;

    private Usuario usuario;

    public JwtAuthenticationToken(String token)
    {
        super(null);

        this.token = token;
        this.setAuthenticated(false);
    }

    public JwtAuthenticationToken(Usuario usuario, Collection<? extends GrantedAuthority> authorities)
    {
        super(authorities);

        this.eraseCredentials();

        this.usuario = usuario;

        super.setAuthenticated(true);
    }

    @Override
    public void setAuthenticated(boolean authenticated)
    {
        if (authenticated)
            throw new IllegalArgumentException("Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead");

        super.setAuthenticated(false);
    }

    @Override
    public Object getCredentials()
    {
        return token;
    }

    @Override
    public Object getPrincipal()
    {
        return usuario;
    }

    @Override
    public void eraseCredentials()
    {
        super.eraseCredentials();

        token = null;
    }
}
