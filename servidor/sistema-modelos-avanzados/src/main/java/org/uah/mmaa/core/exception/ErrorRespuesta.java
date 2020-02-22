package org.uah.mmaa.core.exception;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;
import org.uah.mmaa.config.security.authorization.JwtAuthenticationToken;
import org.uah.mmaa.features.usuarios.Usuario;


public class ErrorRespuesta
{
    private final int codigo;

    private final HttpStatus error;

    private final String mensaje;

    private final String fecha;

    private String usuario;

    private String peticion;

    private static final String MENSAJE_GENERICO = "Se ha producido un error al realizar la operaci�n seleccionada. Por favor, int�ntelo de nuevo o contacte con su administrador.";

    public ErrorRespuesta(HttpStatus httpStatus, Exception exception)
    {
        this.error = httpStatus;
        this.codigo = httpStatus.value();
        this.mensaje = exception.getMessage() == null ? MENSAJE_GENERICO : exception.getMessage();
        this.fecha = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
    }

    public ErrorRespuesta(HttpStatus httpStatus, Exception exception, WebRequest webRequest)
    {
        this(httpStatus, exception);

        if (webRequest.getUserPrincipal() instanceof JwtAuthenticationToken)
            this.usuario = ((Usuario) ((JwtAuthenticationToken) webRequest.getUserPrincipal()).getPrincipal()).getPerfil().getEmail();

        this.peticion = webRequest.getDescription(false);
    }

    public int getCodigo()
    {
        return codigo;
    }

    public HttpStatus getError()
    {
        return error;
    }

    public String getMensaje()
    {
        return mensaje;
    }

    public String getFecha()
    {
        return fecha;
    }

    public String getUsuario()
    {
        return usuario;
    }

    public String getPeticion()
    {
        return peticion;
    }
}
