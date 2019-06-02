package org.foryou.moodleconduct.controller;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.Project;
import org.foryou.moodleconduct.dao.vo.ProjectVo;
import org.foryou.moodleconduct.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@GetMapping
	public List<Project> getProjectList(){
        return projectService.getProjectList();   
    }
	
	@PostMapping
	public Project addProject(@RequestBody ProjectVo projectForm){
	    return projectService.saveProject(projectForm);   
	}
	
	@DeleteMapping("/{projectId}")
	public void deleteProject(@PathVariable(value="projectId") long projectId) {
	    projectService.removeProject(projectId);
	}
	
}
