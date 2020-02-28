package org.uah.mmaa.config.security.login;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonObject;


@Component
public class LoginFilter extends UsernamePasswordAuthenticationFilter
{
    public LoginFilter(AuthenticationManager authenticationManager, AuthenticationSuccessHandler successHandler, AuthenticationFailureHandler failureHandler)
    {
        setAuthenticationManager(authenticationManager);
        setAuthenticationSuccessHandler(successHandler);
        setAuthenticationFailureHandler(failureHandler);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException
    {
        try
        {
            JsonObject loginRequest = new Gson().fromJson(request.getReader(), JsonObject.class);

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(loginRequest.get("email").getAsString(), loginRequest.get("password").getAsString());

            return getAuthenticationManager().authenticate(auth);
        }
        catch (IOException e)
        {
            throw new AuthenticationServiceException(e.getMessage());
        }
    }
}
