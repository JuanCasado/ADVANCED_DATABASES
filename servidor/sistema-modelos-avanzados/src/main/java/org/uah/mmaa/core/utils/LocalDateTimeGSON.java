package org.uah.mmaa.core.utils;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;


public class LocalDateTimeGSON implements JsonSerializer<LocalDateTime>, JsonDeserializer<LocalDateTime>
{
    @Override
    public JsonElement serialize(LocalDateTime src, Type typeOfSrc, JsonSerializationContext context)
    {
        return new JsonPrimitive(src.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());
    }

    @Override
    public LocalDateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException
    {
    	DateTimeFormatter formato = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		LocalDateTime fecha;

		if (!json.toString().contains("T"))
			fecha = DateUtils.asLocalDateTime(json.getAsLong());
		else
			fecha = LocalDateTime.parse(json.getAsString(), formato);

		return fecha;
    }
}
