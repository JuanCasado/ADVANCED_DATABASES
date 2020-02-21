package org.uah.mmaa.config.security.common;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.uah.mmaa.core.exception.ErrorRespuesta;
import org.uah.mmaa.core.utils.UahUtils;

import com.google.gson.Gson;


@Component
public class UahAuthenticationFailureHandler implements AuthenticationFailureHandler
{
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException
    {

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Gson gson = UahUtils.crearUahGsonBuilder().create();

        gson.toJson(new ErrorRespuesta(HttpStatus.UNAUTHORIZED, e), response.getWriter());
    }
}
