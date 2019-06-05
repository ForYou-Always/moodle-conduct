package org.foryou.moodleconduct.service;


import org.foryou.moodleconduct.dao.entity.Role;
import org.foryou.moodleconduct.dao.entity.UserAuthorityInfo;
import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.repository.RoleRepository;
import org.foryou.moodleconduct.dao.repository.UserAuthorityInfoRepository;
import org.foryou.moodleconduct.dao.repository.UserCredentialRepository;
import org.foryou.moodleconduct.dao.vo.UserRegistrationForm;
import org.foryou.moodleconduct.utils.PasswordUtils;
import org.foryou.moodleconduct.utils.VexamineConstants;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

@Service
public class RegistrationService {

	@Autowired
	private UserCredentialRepository userCredentialRepo;

	@Autowired
	private UserAuthorityInfoRepository userAuthorityInfoRepo;

	@Autowired
	private RoleRepository roleRepo;

	public UserCredentials registerAppUser(UserRegistrationForm registrationForm) {
		String mailId = registrationForm.getMailId();
		String password = registrationForm.getPassword();
		UserCredentials userCredentials = this.registerUser(mailId, password);
		return userCredentials;
	}

	public UserAuthorityInfo setUserAuthority(UserCredentials userCredentials, String roleType) {
		String mailId = userCredentials.getMailId();
		Long userId = userCredentials.getId();
		
		String sessionUser = getSessionUser(mailId);
		Role roleDetails = roleRepo.findByType(roleType);

		UserAuthorityInfo userAuth = UserAuthorityInfo.builder()
				.userCredentials(userCredentials)
				.userRole(roleDetails)
				.createUser(sessionUser)
				.updateUser(sessionUser)
				.build();
		
		checkAndRemoveExistingUserAuth(userId);
		return userAuthorityInfoRepo.save(userAuth);
	}

	private UserCredentials registerUser(String mailId, String password ){
		String sessionUser = getSessionUser(mailId);
		if(checkUserExists(mailId)) {
			throw new DuplicateKeyException("User - \""+mailId+"\" already exists."
					+ " So user cannot be registered");
		}

		String secureSalt = PasswordUtils.generateSALT(30);
		byte[] hashedPassword = PasswordUtils.generateSecurePassword(password, secureSalt);

		UserCredentials userCredentials = UserCredentials.builder()
				.mailId(mailId)
				.userName(mailId)
				.hashedPassword(hashedPassword)
				.hashedSalt(secureSalt.getBytes())
				.createUser(sessionUser)
				.updateUser(sessionUser)
				.build();
		return userCredentialRepo.save(userCredentials);
	}

	private String getSessionUser(String userName) {
		String sessionUser = VexamineConstants.SYSTEM_USER;
		if(!ObjectUtils.isEmpty(CookieSessionStorage.get())) {
			sessionUser = CookieSessionStorage.get().getUserName();
			if(StringUtils.isEmpty(sessionUser)) {
				sessionUser = VexamineConstants.SYSTEM_USER;
			}
		}
		return sessionUser;
	}

	private boolean checkUserExists(String userName) {
		UserCredentials userCredentials = userCredentialRepo.findByMailId(userName);
		return !ObjectUtils.isEmpty(userCredentials);
	}

	private void checkAndRemoveExistingUserAuth(Long userId) {
		UserAuthorityInfo userAuthInfo = userAuthorityInfoRepo.findByUserCredentialsId(userId);
		if(!ObjectUtils.isEmpty(userAuthInfo)) {
			userAuthorityInfoRepo.deleteById(userAuthInfo.getId());
		}
	}

	public UserCredentials fetchUserCredentials(){
		UserCredentials userCredentials = userCredentialRepo.findByMailId(CookieSessionStorage.get().getUserName());
		if(ObjectUtils.isEmpty(userCredentials)) {
			return null;
		}
		return userCredentials;
	}
}
