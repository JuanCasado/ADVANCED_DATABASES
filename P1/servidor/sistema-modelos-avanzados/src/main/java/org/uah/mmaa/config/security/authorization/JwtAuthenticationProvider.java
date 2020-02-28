package org.uah.mmaa.config.security.authorization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.uah.mmaa.config.security.common.JwtUtils;
import org.uah.mmaa.config.security.common.UahUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;


@Component
public class JwtAuthenticationProvider implements AuthenticationProvider
{
    @Autowired
    private JwtUtils jwtManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException
    {
        String token = (String) authentication.getCredentials();

        Jws<Claims> jwsClaims = jwtManager.parseClaims(token);

        String email = jwsClaims.getBody().getSubject();

        UahUserDetails uahUserDetails = (UahUserDetails) userDetailsService.loadUserByUsername(email);

        return new JwtAuthenticationToken(uahUserDetails.getUsuario(), uahUserDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication)
    {
        return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
