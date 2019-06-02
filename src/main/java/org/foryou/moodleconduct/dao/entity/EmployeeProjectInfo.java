package org.foryou.moodleconduct.dao.entity;


import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Table(name = "employee_project_info")

public class EmployeeProjectInfo implements Serializable {
    private static final long serialVersionUID = -1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mailId;
    
    @ManyToOne
    @JoinColumn(name = "project", referencedColumnName="id")
    private Project project;
    
    @ManyToOne
    @JoinColumn(name = "role", referencedColumnName="id")
    private Role role;
    
    private String teamLead;
    
    private String manager;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    private String createUser;
    
    private String updateUser;

    @CreationTimestamp
    private Date createDate;
    
    @UpdateTimestamp
    private Date updateDate;

}
