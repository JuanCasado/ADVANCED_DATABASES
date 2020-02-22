package org.uah.mmaa.core.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
public class ErrorController extends ResponseEntityExceptionHandler
{
    public static final Logger LOGGER = LoggerFactory.getLogger(ErrorController.class);

    @ExceptionHandler
    protected ResponseEntity<Object> errorNotFound(RecursoNoEncontradoException ex, WebRequest request)
    {
        ErrorRespuesta body = new ErrorRespuesta(HttpStatus.NOT_FOUND, ex, request);

        return handleExceptionInternal(ex, body, new HttpHeaders(), body.getError(), request);
    }

    @ExceptionHandler
    protected ResponseEntity<Object> errorNotFound(RecursoDuplicadoException ex, WebRequest request)
    {
        ErrorRespuesta body = new ErrorRespuesta(HttpStatus.CONFLICT, ex, request);

        return handleExceptionInternal(ex, body, new HttpHeaders(), body.getError(), request);
    }

    @ExceptionHandler
    protected ResponseEntity<Object> errorAccesoDenegado(AccessDeniedException ex, WebRequest request)
    {
        ErrorRespuesta body = new ErrorRespuesta(HttpStatus.FORBIDDEN, ex, request);

        return handleExceptionInternal(ex, body, new HttpHeaders(), body.getError(), request);
    }

    @ExceptionHandler
    protected ResponseEntity<Object> errorInterno(Exception ex, WebRequest request)
    {
        ErrorRespuesta body = new ErrorRespuesta(HttpStatus.INTERNAL_SERVER_ERROR, ex, request);

        return handleExceptionInternal(ex, body, new HttpHeaders(), body.getError(), request);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, @Nullable Object body, HttpHeaders headers, HttpStatus status, WebRequest request)
    {
        LOGGER.error(ex.getMessage(), ex);

        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);

        ErrorRespuesta error = new ErrorRespuesta(status, ex, request);

        return new ResponseEntity<>(error, headers, status);
    }
}
