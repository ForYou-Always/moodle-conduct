package org.foryou.moodleconduct.service;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.UserDetails;
import org.foryou.moodleconduct.dao.repository.UserDetailRepository;
import org.foryou.moodleconduct.dao.vo.LocationDetailVo;
import org.foryou.moodleconduct.dao.vo.UserDetailVo;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javassist.NotFoundException;

@Service
public class UserDetailService {

	@Autowired
	private UserDetailRepository userDetailRepo;
	
	public List<UserDetails> fetchUserDetails(){
		return userDetailRepo.findAll();
	}
	
	public UserDetails fetchUserInfo(){
		UserDetails userInfo = userDetailRepo.findByMailId(CookieSessionStorage.get().getUserName());
		if(ObjectUtils.isEmpty(userInfo)) {
			return UserDetails.builder().build();
		}
		return userInfo;
	}

	public UserDetails fetchTargetUser(String empId){
		return userDetailRepo.findByEmpId(empId);
	}
	
	private UserDetails fetchTargetUserByMail(String mailId){
		return userDetailRepo.findByMailId(mailId);
	}

	public UserDetails saveUserInfo(UserDetailVo userDetailVo){
		String sessionUser = CookieSessionStorage.get().getUserName();
		
		LocationDetailVo locationDetailVo = LocationDetailVo.builder().build();
		BeanUtils.copyProperties(userDetailVo, locationDetailVo);
		
		UserDetails userDetailBuilder = UserDetails.builder()
				.build();
		BeanUtils.copyProperties(userDetailVo, userDetailBuilder);
		
		checkEmpIdExists(userDetailBuilder);
		if(userDetailBuilder.getId()==null) {
			userDetailBuilder.setCreateUser(sessionUser);
		}
		userDetailBuilder.setUpdateUser(sessionUser);
		return userDetailRepo.save(userDetailBuilder);
	}

	public String deleteUser(String empId) throws NotFoundException{
		UserDetails userDetail = userDetailRepo.findByEmpId(empId);

		if(!ObjectUtils.isEmpty(userDetail)) {
			userDetailRepo.deleteByEmpId(empId);
		}else {		
			throw new NotFoundException("Employee - "+ empId +" doesnot Exists ");
		}		
		return "Employee Details Removed";
	}

	private void checkEmpIdExists(UserDetails userDetailBuilder) {
		UserDetails userDetail = this.fetchTargetUserByMail(userDetailBuilder.getMailId());
		if(!ObjectUtils.isEmpty(userDetail)) {
			userDetailBuilder.setId(userDetail.getId());
			userDetailBuilder.setCreateUser(userDetail.getCreateUser());
		}
	}
}
