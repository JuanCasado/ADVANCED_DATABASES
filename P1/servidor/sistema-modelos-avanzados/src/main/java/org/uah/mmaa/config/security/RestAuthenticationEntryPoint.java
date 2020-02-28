package org.uah.mmaa.config.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.uah.mmaa.core.exception.ErrorRespuesta;
import org.uah.mmaa.core.utils.UahUtils;

import com.google.gson.Gson;


@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint
{
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException
    {
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
        response.addHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        response.addHeader("Access-Control-Allow-Origin", "*");

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        Gson gson = UahUtils.crearUahGsonBuilder().create();

        gson.toJson(new ErrorRespuesta(HttpStatus.UNAUTHORIZED, authException), response.getWriter());
    }
}
