package org.foryou.moodleconduct.dao.repository;


import org.foryou.moodleconduct.dao.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface RoleRepository extends JpaRepository<Role, Long> {

}
