package org.uah.mmaa.core.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.ServletRequestHandledEvent;


@Component
public class HttpAuditListener implements ApplicationListener<ServletRequestHandledEvent>
{
    public static final Logger LOGGER = LoggerFactory.getLogger(HttpAuditListener.class);

    @Override
    public void onApplicationEvent(ServletRequestHandledEvent event)
    {
        LOGGER.info("Petición HTTP (" + "usuario: " + event.getUserName() + "; " + "url: " + event.getRequestUrl() + "; " + "método: " + event.getMethod() + "; " + "tiempo: "
                + event.getProcessingTimeMillis() + "; " + "estado: " + event.getStatusCode() + "; " + "fecha: " + event.getTimestamp() + " )");
    }
}
