package org.foryou.moodleconduct.service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.foryou.moodleconduct.dao.entity.UserAuthorityInfo;
import org.foryou.moodleconduct.dao.entity.UserCredentials;
import org.foryou.moodleconduct.dao.repository.UserAuthorityInfoRepository;
import org.foryou.moodleconduct.dao.vo.UserAuthorityVo;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserAuthorityService {

	@Autowired
	private UserAuthorityInfoRepository userAuthorityInfoRepo;

	public UserAuthorityInfo setNewUserAuthority(UserCredentials userCredentials){
		String sessionUser = userCredentials.getMailId();

		try {
			sessionUser = CookieSessionStorage.get().getUserName();
		}catch(NullPointerException e) {
			log.info("Session doesnot exists");	
		}

		UserAuthorityInfo userAuthorityInfo = UserAuthorityInfo.builder()
				.userCredentials(userCredentials)
				.admin(false)
				.developer(true)
				.tester(true)
				.systemAdmin(false)
				.manager(false)
				.updateUser(sessionUser)
				.build();

		UserAuthorityInfo existingUserAuthority = fetchUserAuthority(userCredentials.getId());
		if(!ObjectUtils.isEmpty(existingUserAuthority)) {
			userAuthorityInfo.setId(existingUserAuthority.getId());
		} else {
			userAuthorityInfo.setCreateUser(sessionUser);
		}
		return userAuthorityInfoRepo.save(userAuthorityInfo);
	}

	public UserAuthorityInfo modifyUserAuthority(UserCredentials userCredentials, List<String> authority){
		String sessionUser = CookieSessionStorage.get().getUserName();

		UserAuthorityInfo userAuthorityInfo = UserAuthorityInfo.builder()
				.userCredentials(userCredentials)
				.admin(authority.contains("ADMIN"))
				.developer(authority.contains("DEVELOPER"))
				.tester(authority.contains("TESTER"))
				.systemAdmin(authority.contains("SYSTEM_ADMIN"))
				.manager(authority.contains("MANAGER"))
				.updateUser(sessionUser)
				.updateDate(new Date())
				.build();

		UserAuthorityInfo existingUserAuthority = fetchUserAuthority(userCredentials.getId());

		if(!ObjectUtils.isEmpty(existingUserAuthority)) {
			userAuthorityInfo.setId(existingUserAuthority.getId());
		} else {
			userAuthorityInfo.setCreateUser(sessionUser);
		}
		return userAuthorityInfoRepo.save(userAuthorityInfo);
	}

	public UserAuthorityInfo fetchUserAuthority(long mailId) {
		return userAuthorityInfoRepo.findByUserCredentialsId(mailId);
	}

	public UserAuthorityVo processUserAuthorityDetails(long mailId) {
		UserAuthorityInfo userAuthorityInfo = this.fetchUserAuthority(mailId);
		UserAuthorityVo userAuthorityVo = UserAuthorityVo.builder()
				.signedInUser(userAuthorityInfo.getUserCredentials().getMailId())
				.mailId(userAuthorityInfo.getUserCredentials().getMailId())
				.build();

		List<String> userRoles = new ArrayList<String>();
		if(userAuthorityInfo.isAdmin()) {
			userRoles.add("ADMIN");
		}
		if(userAuthorityInfo.isDeveloper()) {
			userRoles.add("DEVELOPER");
		}
		if(userAuthorityInfo.isTester()) {
			userRoles.add("TESTER");
		}
		if(userAuthorityInfo.isSystemAdmin()) {
			userRoles.add("SYSTEM-ADMIN");
		}
		if(userAuthorityInfo.isManager()) {
			userRoles.add("MANAGER");
		}
		userAuthorityVo.setRoles(userRoles);
		return userAuthorityVo;
	}
}
