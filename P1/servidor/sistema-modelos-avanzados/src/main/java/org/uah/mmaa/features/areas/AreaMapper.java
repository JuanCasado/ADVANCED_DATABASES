package org.uah.mmaa.features.areas;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AreaMapper
{
    public List<Area> fetchAreas();
}
