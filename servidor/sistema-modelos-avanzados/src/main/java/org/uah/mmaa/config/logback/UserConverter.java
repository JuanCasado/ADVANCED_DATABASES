package org.uah.mmaa.config.logback;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.uah.mmaa.config.security.common.UahUserDetails;

import ch.qos.logback.classic.pattern.ClassicConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;

public class UserConverter extends ClassicConverter
{
    @Override
    public String convert(ILoggingEvent event)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UahUserDetails)
        {
            UahUserDetails uahUserDetails = (UahUserDetails) authentication.getPrincipal();

            return uahUserDetails.getUsername().toUpperCase();
        }

        return "INVITADO";
    }
}
