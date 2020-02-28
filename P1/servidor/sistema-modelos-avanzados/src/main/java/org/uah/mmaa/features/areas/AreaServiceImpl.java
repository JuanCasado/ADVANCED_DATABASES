package org.uah.mmaa.features.areas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AreaServiceImpl implements AreaService
{
    @Autowired
    private AreaMapper areaMapper;
    
    @Override
    public List<Area> fetchAreas()
    {
        return areaMapper.fetchAreas();
    }
}
