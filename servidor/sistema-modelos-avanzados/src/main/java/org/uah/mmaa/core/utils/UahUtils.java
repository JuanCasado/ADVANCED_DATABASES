package org.uah.mmaa.core.utils;

import java.time.LocalDateTime;

import com.google.gson.GsonBuilder;
import com.google.gson.internal.bind.DateTypeAdapter;

public class UahUtils
{
    private UahUtils()
    {
        throw new UnsupportedOperationException("Not instanciable class!");
    }

    public static GsonBuilder crearUahGsonBuilder()
    {
        return new GsonBuilder().registerTypeAdapterFactory(DateTypeAdapter.FACTORY).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeGSON());
    }

    public static String asciiToHex(String asciiStr)
    {
        char[] chars = asciiStr.toCharArray();

        StringBuilder hex = new StringBuilder();

        for (char ch : chars)
        {
            hex.append(Integer.toHexString((int) ch));
        }

        return hex.toString();
    }
}
