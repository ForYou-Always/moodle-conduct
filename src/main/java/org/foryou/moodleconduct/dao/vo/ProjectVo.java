package org.foryou.moodleconduct.dao.vo;


import java.util.Date;

import lombok.Data;

@Data
public class ProjectVo  {
    
    private Long id;

    private String name;

    private String description;

    private Date startDate;
    
    private Date endDate;
}
