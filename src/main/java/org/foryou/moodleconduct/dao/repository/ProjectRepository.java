package org.foryou.moodleconduct.dao.repository;


import org.foryou.moodleconduct.dao.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    Project findByName(String project);

    
}
