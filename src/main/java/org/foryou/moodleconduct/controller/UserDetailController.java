package org.foryou.moodleconduct.controller;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.UserDetails;
import org.foryou.moodleconduct.dao.vo.UserDetailVo;
import org.foryou.moodleconduct.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

@RestController
@RequestMapping("/user/details/")
public class UserDetailController {
	
	@Autowired
	private UserDetailService userDetailService;

	@GetMapping("all")
	public List<UserDetails> fetchAllUserInfo(){
		return userDetailService.fetchUserDetails();
	}
	
	@GetMapping
	public UserDetails fetchUserInfo(){
		return userDetailService.fetchUserInfo();
	}
	
	@GetMapping("/{empId}")
	public UserDetails fetchTargetUser(@PathVariable String empId){
		return userDetailService.fetchTargetUser(empId);
	}
	
	@PostMapping
	public UserDetails updateUserInfo(@RequestBody UserDetailVo userDetailVo){
		return userDetailService.saveUserInfo(userDetailVo);
	}
	
	@DeleteMapping("/{empId}")
	public String removeUserInfo(@PathVariable String empId) throws NotFoundException{
		return userDetailService.deleteUser(empId);
	}
}


/*@PutMapping
public UserDetails updateUserInfo(@RequestBody UserDetailVo userDetailVo){
	return userDetailService.saveUserInfo(userDetailVo);
}*/	