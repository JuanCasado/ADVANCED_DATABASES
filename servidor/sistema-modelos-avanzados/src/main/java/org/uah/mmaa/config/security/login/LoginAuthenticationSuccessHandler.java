package org.uah.mmaa.config.security.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.uah.mmaa.config.security.common.JwtPropiedades;
import org.uah.mmaa.config.security.common.JwtUtils;
import org.uah.mmaa.config.security.common.UahUserDetails;
import org.uah.mmaa.core.utils.UahUtils;

@Component
public class LoginAuthenticationSuccessHandler implements AuthenticationSuccessHandler
{
    @Autowired
    private JwtUtils tokenFactory;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException
    {
        UahUserDetails userContext = (UahUserDetails) authentication.getPrincipal();

        String accessToken = tokenFactory.createAccessJwtToken(userContext);
        String refreshToken = tokenFactory.createRefreshToken(userContext);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setAccessToken(accessToken);
        loginResponse.setRefreshToken(refreshToken);

        response.getWriter().write(UahUtils.crearUahGsonBuilder().create().toJson(loginResponse));

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.addHeader(JwtPropiedades.AUTHORIZATION_HEADER_STRING, JwtPropiedades.TOKEN_BEARER_PREFIX + " " + accessToken);
    }
}