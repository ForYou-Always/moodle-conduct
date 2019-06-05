package org.foryou.moodleconduct.service;


import java.util.Arrays;

import javax.security.sasl.AuthenticationException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.repository.UserCredentialRepository;
import org.foryou.moodleconduct.utils.CookieUtil;
import org.foryou.moodleconduct.utils.JWTUtil;
import org.foryou.moodleconduct.utils.PasswordUtils;
import org.foryou.moodleconduct.utils.vo.CookieSessionInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class LoginService {

	@Autowired
	private UserCredentialRepository userCredentialRepo;

	public UserCredentials authorizeApplication(String userName, String password)throws AuthenticationException {
		UserCredentials userCredentials = checkUserExists(userName);
		validatePassword(password, userCredentials);
		return userCredentials;
	}

	private boolean validatePassword(String password, UserCredentials userCredentials)
			throws AuthenticationException {
		byte[] secureSalt = userCredentials.getHashedSalt();
		byte[] hashedPassword = PasswordUtils.hashPasswordWithSalt(password.toCharArray(), secureSalt);
		if(Arrays.equals(hashedPassword, userCredentials.getHashedPassword())){
			return true;
		}

		throw new AuthenticationException("Invalid Credentials for"
				+ " user - \""+userCredentials.getMailId()+"\"");
	}

	private UserCredentials checkUserExists(String userName) {
		UserCredentials userCredentials = userCredentialRepo.findByMailId(userName);
		if(ObjectUtils.isEmpty(userCredentials)) {
			throw new IllegalArgumentException("User - \""+userName+"\" doesn't exists."
					+ " So please verify your userName");
		}
		return userCredentials;
	}

	public Cookie maintainUserSession(String userName, HttpServletResponse servletResponse) {
		String webToken = JWTUtil.buildWebToken(userName);

		CookieSessionInfo cookieSessionInfo = CookieSessionInfo.builder()
				.webToken(webToken)
				.path("/")      // allows reuests from path mentioned as prefix.
				.maxAge(-1)     // Session will be Maintained till browser shutsdown.
				.httpsFlag(false)
				.domain("vexamine.com")
				.build();
		return CookieUtil.create(cookieSessionInfo);
	}
}
