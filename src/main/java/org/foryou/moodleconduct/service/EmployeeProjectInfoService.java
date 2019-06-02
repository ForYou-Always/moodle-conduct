package org.foryou.moodleconduct.service;


import java.util.List;
import java.util.Optional;

import org.foryou.moodleconduct.dao.entity.EmployeeProjectInfo;
import org.foryou.moodleconduct.dao.entity.Project;
import org.foryou.moodleconduct.dao.repository.EmployeeProjectInfoRepository;
import org.foryou.moodleconduct.dao.repository.ProjectRepository;
import org.foryou.moodleconduct.dao.repository.RoleRepository;
import org.foryou.moodleconduct.dao.vo.EmployeeProjectInfoVo;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class EmployeeProjectInfoService {

    @Autowired
    private EmployeeProjectInfoRepository empProjectInfoRepo;

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private RoleRepository roleRepo;

    public List<EmployeeProjectInfo> getEmployeeProjectInfoList(){
        return empProjectInfoRepo.findAll();   
    }

    public EmployeeProjectInfo saveEmployeeProjectInfo(EmployeeProjectInfoVo empProjectInfoForm) {
        String sessionUser = CookieSessionStorage.get().getUserName();

        EmployeeProjectInfo empProjectInfoBuilder = EmployeeProjectInfo.builder().build();
        BeanUtils.copyProperties(empProjectInfoForm, empProjectInfoBuilder);

        empProjectInfoBuilder.setProject(projectRepo.findById(empProjectInfoForm.getProjectId()).get());
        empProjectInfoBuilder.setRole(roleRepo.findById(empProjectInfoForm.getRoleId()).get());
        
        this.filterExisting(empProjectInfoForm, empProjectInfoBuilder);
        empProjectInfoBuilder.setUpdateUser(sessionUser);
        
        return empProjectInfoRepo.save(empProjectInfoBuilder);
    }

    public void filterExisting(EmployeeProjectInfoVo empProjectInfoForm, EmployeeProjectInfo empProjectInfoBuilder) {
        EmployeeProjectInfo duplicateEmployeeInfo = empProjectInfoRepo.findByMailIdAndProjectAndRole(empProjectInfoForm.getMailId(),
                empProjectInfoBuilder.getProject(), empProjectInfoBuilder.getRole());

        if(!ObjectUtils.isEmpty(duplicateEmployeeInfo)) {
            String sessionUser = CookieSessionStorage.get().getUserName();
            empProjectInfoBuilder.setId(duplicateEmployeeInfo.getId());
            empProjectInfoBuilder.setCreateUser(sessionUser);
        }
    }

    public void removeEmployeeProjectInfo(long empProjectInfoId){
        empProjectInfoRepo.deleteById(empProjectInfoId);   
    }
}
