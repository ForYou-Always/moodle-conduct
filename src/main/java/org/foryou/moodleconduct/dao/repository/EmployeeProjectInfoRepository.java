package org.foryou.moodleconduct.dao.repository;

import org.foryou.moodleconduct.dao.entity.EmployeeProjectInfo;
import org.foryou.moodleconduct.dao.entity.Project;
import org.foryou.moodleconduct.dao.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface EmployeeProjectInfoRepository extends JpaRepository<EmployeeProjectInfo, Long> {

    EmployeeProjectInfo findByMailIdAndProjectAndRole(String mailId, Project projectId, Role role);
}
