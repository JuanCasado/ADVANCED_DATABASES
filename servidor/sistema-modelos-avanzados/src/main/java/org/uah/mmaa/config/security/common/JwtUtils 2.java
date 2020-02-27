package org.uah.mmaa.config.security.common;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.uah.mmaa.core.utils.DateUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;


@Component
public class JwtUtils
{
    @Autowired
    private JwtPropiedades jwtPropiedades;

    public String createAccessJwtToken(UahUserDetails leoUserDetails)
    {
        Claims claims = Jwts.claims().setSubject(leoUserDetails.getUsername());
        claims.put("scopes", leoUserDetails.getAuthorities().stream().map(GrantedAuthority::toString).collect(Collectors.toList()));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuer(jwtPropiedades.getTokenIssuer())
                .setIssuedAt(DateUtils.asDate(LocalDateTime.now()))
                .setExpiration(DateUtils.asDate(LocalDateTime.now().plusMinutes(jwtPropiedades.getTokenExpirationTime())))
                .signWith(SignatureAlgorithm.HS512, jwtPropiedades.getTokenSigningKey())
                .compact();
    }

    public String createRefreshToken(UahUserDetails leoUserDetails)
    {
        Claims claims = Jwts.claims().setSubject(leoUserDetails.getUsername());
        claims.put("scopes", Arrays.asList("ROLE_REFRESH_TOKEN"));

        return Jwts.builder()
                .setClaims(claims)
                .setId(UUID.randomUUID().toString())
                .setIssuer(jwtPropiedades.getTokenIssuer())
                .setIssuedAt(DateUtils.asDate(LocalDateTime.now()))
                .setExpiration(DateUtils.asDate(LocalDateTime.now().plusMinutes(jwtPropiedades.getRefreshTokenExpTime())))
                .signWith(SignatureAlgorithm.HS512, jwtPropiedades.getTokenSigningKey())
                .compact();
    }

    public Optional<String> extract(HttpServletRequest request)
    {
        String authHeader = request.getHeader(JwtPropiedades.AUTHORIZATION_HEADER_STRING);

        if (authHeader == null || authHeader.length() < JwtPropiedades.TOKEN_BEARER_PREFIX.length())
            return Optional.empty();

        return Optional.of(authHeader.substring(JwtPropiedades.TOKEN_BEARER_PREFIX.length(), authHeader.length()));
    }

    public Jws<Claims> parseClaims(String token)
    {
        try
        {
            return Jwts.parser().setSigningKey(jwtPropiedades.getTokenSigningKey()).parseClaimsJws(token);
        }
        catch (UnsupportedJwtException | MalformedJwtException | IllegalArgumentException | SignatureException ex)
        {
            throw new BadCredentialsException("Invalid JWT token: ");
        }
        catch (ExpiredJwtException expiredEx)
        {
            throw new BadCredentialsException("JWT Token expired");
        }
    }
}
