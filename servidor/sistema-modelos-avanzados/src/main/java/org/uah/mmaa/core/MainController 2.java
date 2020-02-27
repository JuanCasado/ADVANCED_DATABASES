package org.uah.mmaa.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class MainController
{
    public static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

    @GetMapping
    public String main()
    {
        String mensajeInicial = "Sistema Modelos Avanzados en marcha";

        LOGGER.debug(mensajeInicial);

        return mensajeInicial;
    }
}
