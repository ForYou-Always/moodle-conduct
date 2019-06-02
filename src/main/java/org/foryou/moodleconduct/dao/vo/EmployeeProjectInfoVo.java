package org.foryou.moodleconduct.dao.vo;


import java.util.Date;

import lombok.Data;

@Data
public class EmployeeProjectInfoVo {
    private Long id;

    private String mailId;
    
    private long projectId;

    private long roleId;
    
    private String teamLead;
    
    private String manager;

    private Date startDate;
    
    private Date endDate;
}
