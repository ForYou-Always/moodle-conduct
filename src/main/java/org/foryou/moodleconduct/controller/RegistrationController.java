package org.foryou.moodleconduct.controller;

import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.vo.UserRegistrationForm;
import org.foryou.moodleconduct.service.RegistrationService;
import org.foryou.moodleconduct.utils.VexamineConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/credentials/")
public class RegistrationController {

	@Autowired
	private RegistrationService registrationService;

	@PostMapping("add/candidate")
	public void addCandidate(@RequestBody UserRegistrationForm registrationForm) {
		UserCredentials userCredentials = registrationService.registerAppUser(registrationForm);
		registrationService.setUserAuthority(userCredentials, VexamineConstants.CANDIDATE_ROLE);
	}
	
	@PostMapping("add/manager")
	public void addManager(@RequestBody UserRegistrationForm registrationForm) {
		UserCredentials userCredentials = registrationService.registerAppUser(registrationForm);
		registrationService.setUserAuthority(userCredentials, VexamineConstants.MANAGER_ROLE);
	}
	
}
