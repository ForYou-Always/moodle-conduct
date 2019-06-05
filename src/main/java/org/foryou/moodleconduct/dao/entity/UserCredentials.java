package org.foryou.moodleconduct.dao.entity;


import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "vexamine_user_credentials")
public class UserCredentials implements Serializable {
    private static final long serialVersionUID = -1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String mailId;
    
    private String userName;
    
    private byte[] hashedPassword;
    
    private byte[] hashedSalt;
    
    private String createUser;
    
    @CreationTimestamp
    private Date createDate;
    
    private String updateUser;
    
    @UpdateTimestamp
    private Date updateDate;

}
