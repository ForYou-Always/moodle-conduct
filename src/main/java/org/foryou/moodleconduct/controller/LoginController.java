package org.foryou.moodleconduct.controller;


import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.vo.SignUpForm;
import org.foryou.moodleconduct.service.LoginService;
import org.foryou.moodleconduct.service.UserAuthorityService;
import org.foryou.moodleconduct.service.UserCredentialService;
import org.foryou.moodleconduct.utils.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private UserCredentialService userCredentialService;

	@Autowired
	private UserAuthorityService userAuthorityService;

	@GetMapping("/home")
	public String renderPlatform(){
		return "asset-main.html";
	}

	@GetMapping("/login")
	public String renderLoginPage(){
		return "asset-login.html";
	}

	@GetMapping("/logout")
	public void logoutSession(HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws IOException{
		CookieUtil.destroy(httpResponse);
		httpResponse.sendRedirect("/login");
	}

	@PostMapping("/user/login")
	@ResponseBody
	public UserCredentials loginUser(@RequestBody SignUpForm signUpForm,HttpServletRequest httpRequest, HttpServletResponse httpResponse)throws IOException {
		String userName = signUpForm.getMailId();
		String password = signUpForm.getPassword();

		UserCredentials userCredentials = loginService.authorizeApplication(userName, password);

		Cookie cookie = loginService.maintainUserSession(userName, httpResponse);
		httpResponse.addCookie(cookie);
		return userCredentials;
	}
	
	@PostMapping("/user/sign-up")
	@ResponseBody
	public UserCredentials signUp(@RequestBody SignUpForm signUpForm, HttpServletRequest httpRequest, HttpServletResponse httpResponse){
		String userName = signUpForm.getMailId();
		String password = signUpForm.getPassword();

		UserCredentials userCredentials = userCredentialService.signUpNewUser(userName, password);

		userAuthorityService.setNewUserAuthority(userCredentials);
		return userCredentials;
	}

	@PostMapping("/user/register")
	@ResponseBody
	public UserCredentials registerNewUser(@RequestBody SignUpForm signUpForm, HttpServletRequest httpRequest, HttpServletResponse httpResponse){
		String userName = signUpForm.getMailId();
		String password = signUpForm.getPassword();

		UserCredentials userCredentials = userCredentialService.signUpNewUser(userName, password);
		
		if(CollectionUtils.isEmpty(signUpForm.getAuthority())) {
			userAuthorityService.setNewUserAuthority(userCredentials);
		} else {
			userAuthorityService.modifyUserAuthority(userCredentials, signUpForm.getAuthority());
		}
		return userCredentials;
	}
}
