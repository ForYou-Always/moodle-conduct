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
@Table(name = "user_details")
public class UserDetails implements Serializable {
    private static final long serialVersionUID = -1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mailId;

    private String empId;
    
    private String domainName;
    
    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName="id")
    private LocationDetails locationDetails;

    private String assetId;
    
    private String virtualResource;
    
    private String createUser;
    
    @CreationTimestamp
    private Date createDate;
    
    private String updateUser;
    
    @UpdateTimestamp
    private Date updateDate;

}
