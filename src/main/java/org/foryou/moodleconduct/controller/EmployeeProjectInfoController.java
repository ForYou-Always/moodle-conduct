package org.foryou.moodleconduct.controller;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.EmployeeProjectInfo;
import org.foryou.moodleconduct.dao.vo.EmployeeProjectInfoVo;
import org.foryou.moodleconduct.service.EmployeeProjectInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/employee/project/")
public class EmployeeProjectInfoController {

	@Autowired
	private EmployeeProjectInfoService empProjectInfoService;
	
	@GetMapping
    public List<EmployeeProjectInfo> getEmployeeProjectInfoList(){
        return empProjectInfoService.getEmployeeProjectInfoList();   
    }
    
    @PostMapping
    public EmployeeProjectInfo addEmployeeProjectInfo(@RequestBody EmployeeProjectInfoVo empProjectForm){
        return empProjectInfoService.saveEmployeeProjectInfo(empProjectForm);   
    }
    
    @DeleteMapping("/{roleId}")
    public void deleteEmployeeProjectInfo(@PathVariable(value="roleId") long roleId) {
        empProjectInfoService.removeEmployeeProjectInfo(roleId);
    }
	
}
