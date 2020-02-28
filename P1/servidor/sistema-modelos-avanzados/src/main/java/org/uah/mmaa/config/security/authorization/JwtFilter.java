package org.uah.mmaa.config.security.authorization;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.uah.mmaa.config.security.common.JwtUtils;


@Component
public class JwtFilter extends BasicAuthenticationFilter
{
    @Autowired
    private AuthenticationFailureHandler failureHandler;

    @Autowired
    private JwtUtils jwtManager;

    public JwtFilter(AuthenticationManager authManager, AuthenticationFailureHandler failureHandler)
    {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException
    {
        Optional<String> token = jwtManager.extract(req);

        if (token.isPresent())
        {
            Authentication auth = getAuthenticationManager().authenticate(new JwtAuthenticationToken(token.get()));

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(req, res);
    }

    @Override
    protected void onUnsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException
    {
        SecurityContextHolder.clearContext();

        try
        {
            failureHandler.onAuthenticationFailure(request, response, failed);
        }
        catch (ServletException e)
        {
            throw new IOException(e.getMessage(), e.getCause());
        }
    }
}
