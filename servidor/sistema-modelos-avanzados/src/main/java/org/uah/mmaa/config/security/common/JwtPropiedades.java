package org.uah.mmaa.config.security.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


@Configuration
@PropertySource("classpath:security/jwt.properties")
public class JwtPropiedades
{
    public static final String AUTHORIZATION_HEADER_STRING = "Authorization";

    public static final String TOKEN_BEARER_PREFIX = "Bearer ";

    @Value("${jwt.tokenExpirationTime}")
    private Long tokenExpirationTime;

    @Value("${jwt.refreshTokenExpTime}")
    private Long refreshTokenExpTime;

    @Value("${jwt.tokenIssuer}")
    private String tokenIssuer;

    @Value("${jwt.tokenSigningKey}")
    private String tokenSigningKey;

    public Long getTokenExpirationTime()
    {
        return tokenExpirationTime;
    }

    public void setTokenExpirationTime(Long tokenExpirationTime)
    {
        this.tokenExpirationTime = tokenExpirationTime;
    }

    public Long getRefreshTokenExpTime()
    {
        return refreshTokenExpTime;
    }

    public void setRefreshTokenExpTime(Long refreshTokenExpTime)
    {
        this.refreshTokenExpTime = refreshTokenExpTime;
    }

    public String getTokenIssuer()
    {
        return tokenIssuer;
    }

    public void setTokenIssuer(String tokenIssuer)
    {
        this.tokenIssuer = tokenIssuer;
    }

    public String getTokenSigningKey()
    {
        return tokenSigningKey;
    }

    public void setTokenSigningKey(String tokenSigningKey)
    {
        this.tokenSigningKey = tokenSigningKey;
    }
}
