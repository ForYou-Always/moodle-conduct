package org.foryou.moodleconduct.service;


import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.repository.UserCredentialRepository;
import org.foryou.moodleconduct.utils.PasswordUtils;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class UserCredentialService {

	@Autowired
	private UserCredentialRepository userCredentialRepo;

	public UserCredentials signUpNewUser(String userName, String password ){
		String sessionUser = userName;
//		if(!ObjectUtils.isEmpty(CookieSessionStorage.get())) {
//			sessionUser = CookieSessionStorage.get().getUserName();
//			if(StringUtils.isEmpty(sessionUser)) {
//				sessionUser = userName;
//			}
//		}

		if(checkUserExists(userName)) {
			throw new DuplicateKeyException("User - \""+userName+"\" already exists."
					+ " So user cannot be registered");
		}

		String secureSalt = PasswordUtils.generateSALT(30);
		byte[] hashedPassword = PasswordUtils.generateSecurePassword(password, secureSalt);

		UserCredentials userCredentials = UserCredentials.builder()
				//				.loginName(userName)
				.mailId(userName)
				.hashedPassword(hashedPassword)
				.hashedSalt(secureSalt.getBytes())
				.createUser(sessionUser)
				.updateUser(sessionUser)
				.build();
		return userCredentialRepo.save(userCredentials);
	}

	private boolean checkUserExists(String userName) {
		UserCredentials userCredentials = userCredentialRepo.findByMailId(userName);
		if(ObjectUtils.isEmpty(userCredentials)) {
			return false;
		}
		return true;
	}

	public UserCredentials fetchUserCredentials(){
		UserCredentials userCredentials = userCredentialRepo.findByMailId(CookieSessionStorage.get().getUserName());
		if(ObjectUtils.isEmpty(userCredentials)) {
			return null;
		}
		return userCredentials;
	}
}
