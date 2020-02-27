package org.uah.mmaa.config.logback;

import ch.qos.logback.classic.PatternLayout;

public class PatternLayoutWithUserContext extends PatternLayout
{
    static
    {
        PatternLayout.defaultConverterMap.put("user", UserConverter.class.getName());
    }
}
