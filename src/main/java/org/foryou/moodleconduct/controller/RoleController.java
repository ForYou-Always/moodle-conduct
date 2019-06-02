package org.foryou.moodleconduct.controller;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.Role;
import org.foryou.moodleconduct.dao.vo.RoleVo;
import org.foryou.moodleconduct.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/role/")
public class RoleController {

	@Autowired
	private RoleService roleService;

    @GetMapping
    public List<Role> getRoleList(){
        return roleService.getRoleList();   
    }
    
    @PostMapping
    public Role addRole(@RequestBody RoleVo roleForm){
        return roleService.saveRole(roleForm);   
    }
    
    @DeleteMapping("/{roleId}")
    public void deleteRole(@PathVariable(value="roleId") long roleId) {
        roleService.removeRole(roleId);
    }
    
}
