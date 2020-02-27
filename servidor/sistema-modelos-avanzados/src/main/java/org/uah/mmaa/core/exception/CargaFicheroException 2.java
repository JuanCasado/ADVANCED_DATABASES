package org.uah.mmaa.core.exception;


public class CargaFicheroException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public CargaFicheroException()
    {
        super("Se ha producido un error al cargar los ficheros. Por favor, int�ntelo de nuevo o contacte con su administrador.");
    }

    public CargaFicheroException(String mensaje)
    {
        super(mensaje);
    }
}
