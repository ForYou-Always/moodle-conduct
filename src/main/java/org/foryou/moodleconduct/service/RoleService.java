package org.foryou.moodleconduct.service;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.Role;
import org.foryou.moodleconduct.dao.repository.RoleRepository;
import org.foryou.moodleconduct.dao.vo.RoleVo;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepo;

	public List<Role> getRoleList(){
		return roleRepo.findAll();   
	}

	public Role saveRole(RoleVo roleForm) {
		String sessionUser = null;
		if(!ObjectUtils.isEmpty(CookieSessionStorage.get())) {
			sessionUser = CookieSessionStorage.get().getUserName();
		}

		Role roleBuilder = Role.builder()
				.createUser(sessionUser)
				.updateUser(sessionUser)
				.build();
		BeanUtils.copyProperties(roleForm, roleBuilder);
		return roleRepo.save(roleBuilder);
	}

	public void removeRole(long roleId){
		roleRepo.deleteById(roleId);   
	}

}
