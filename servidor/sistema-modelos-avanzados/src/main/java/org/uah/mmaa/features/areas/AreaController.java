package org.uah.mmaa.features.areas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("area")
public class AreaController
{
    @Autowired
    private AreaService areaService;

    @GetMapping
    public List<Area> getAreas()
    {
        return areaService.fetchAreas();
    }
}
