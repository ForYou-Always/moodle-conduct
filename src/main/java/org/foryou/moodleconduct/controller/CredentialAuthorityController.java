package org.foryou.moodleconduct.controller;


import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.vo.UserAuthorityVo;
import org.foryou.moodleconduct.service.UserAuthorityService;
import org.foryou.moodleconduct.service.UserCredentialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user/credential/")
public class CredentialAuthorityController {

	@Autowired
	private UserCredentialService userCredentialService;

	@Autowired
	private UserAuthorityService userAuthorityService;

	@GetMapping("authenticate")
	public UserAuthorityVo authenticateUser(){
		UserCredentials userCredentials = userCredentialService.fetchUserCredentials();
		return userAuthorityService.processUserAuthorityDetails(userCredentials.getId());
	}

}
