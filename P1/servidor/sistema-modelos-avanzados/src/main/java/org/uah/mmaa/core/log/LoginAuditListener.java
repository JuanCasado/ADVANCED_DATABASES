package org.uah.mmaa.core.log;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


@Component
public class LoginAuditListener implements ApplicationListener<AuthenticationSuccessEvent>
{
    public static final Logger LOGGER = LoggerFactory.getLogger(HttpAuditListener.class);

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event)
    {
        Authentication auth = event.getAuthentication();

        LOGGER.info("Usuario autenticado (" + "usuario: " + auth.getName() + "; " + "fecha: " + LocalDateTime.now() + " )");
    }
}
