package org.foryou.moodleconduct.controller;


import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.vo.UserRegistrationForm;
import org.foryou.moodleconduct.service.LoginService;
import org.foryou.moodleconduct.service.RegistrationService;
import org.foryou.moodleconduct.utils.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/vexamine")
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	@GetMapping("/home")
	public String renderPlatform(){
		return "vexamine-home.html";
	}

	@GetMapping("/candidate/login")
	public String renderCandiadteLoginPage(){
		return "candidate-login.html";
	}
	
	@GetMapping("/manager/login")
	public String renderManagerLoginPage(){
		return "manager-login.html";
	}

	@GetMapping("/logout")
	public void logoutSession(HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws IOException{
		CookieUtil.destroy(httpResponse);
		httpResponse.sendRedirect("/login");
	}

	@PostMapping("/validate/login")
	@ResponseBody
	public UserCredentials loginUser(@RequestBody UserRegistrationForm signUpForm,HttpServletRequest httpRequest, HttpServletResponse httpResponse)throws IOException {
		String userName = signUpForm.getMailId();
		String password = signUpForm.getPassword();

		UserCredentials userCredentials = loginService.authorizeApplication(userName, password);

		Cookie cookie = loginService.maintainUserSession(userName, httpResponse);
		httpResponse.addCookie(cookie);
		return userCredentials;
	}
}
