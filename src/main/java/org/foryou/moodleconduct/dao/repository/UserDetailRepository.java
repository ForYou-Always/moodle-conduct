package org.foryou.moodleconduct.dao.repository;


import org.foryou.moodleconduct.dao.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserDetailRepository extends JpaRepository<UserDetails, Long> {

	UserDetails findByEmpId(String empId);
	
	UserDetails findByMailId(String mailId);

	@Modifying
	Long deleteByEmpId(String empId);

	/*List<UserDetails> findByEntityAndEntityIdAndLoginName(String entityName, Long id, String name);

    List<UserDetails> findByEntityAndLoginName(String entityName, String name);

    @Modifying
    @Query("delete from UserDetails info where info.entity = ?1 and info.entityId = ?2")
    int deleteByEntityAndEntityId(String entityName, Long entityId);


    Page<UserDetails> findByEntityAndEntityIdOrderByLoginName(String entityName,
            Long entityId, Pageable pageable);*/
}
