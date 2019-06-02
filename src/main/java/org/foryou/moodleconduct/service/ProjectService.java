package org.foryou.moodleconduct.service;


import java.util.List;

import org.foryou.moodleconduct.dao.entity.Project;
import org.foryou.moodleconduct.dao.repository.ProjectRepository;
import org.foryou.moodleconduct.dao.vo.ProjectVo;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    public List<Project> getProjectList(){
        return projectRepo.findAll();   
    }

    public Project saveProject(ProjectVo projectForm) {
        String sessionUser = CookieSessionStorage.get().getUserName();
        Project projectBuilder = Project.builder().build();
        BeanUtils.copyProperties(projectForm, projectBuilder);
        
        projectBuilder.setCreateUser(sessionUser);
        projectBuilder.setUpdateUser(sessionUser);
        return projectRepo.save(projectBuilder);
    }

    public void removeProject(long projectId){
        projectRepo.deleteById(projectId);   
    }

}
