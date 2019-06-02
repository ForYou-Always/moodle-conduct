package org.foryou.moodleconduct.dao.vo;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDetailVo {
	private Long id;
	private String mailId;    
	private String empId;
	private String domainName;    
	private String place;    
    private String branch;    
    private int floor;    
    private String seatNo;
}
