package org.foryou.moodleconduct.dao.repository;


import org.foryou.moodleconduct.dao.entity.UserAuthorityInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserAuthorityInfoRepository extends JpaRepository<UserAuthorityInfo, Long> {

	UserAuthorityInfo findByUserCredentialsId(long userId);

	@Modifying
	Long deleteByUserCredentialsMailId(String mailId);

	/*List<UserDetails> findByEntityAndEntityIdAndLoginName(String entityName, Long id, String name);

    List<UserDetails> findByEntityAndLoginName(String entityName, String name);

    @Modifying
    @Query("delete from UserDetails info where info.entity = ?1 and info.entityId = ?2")
    int deleteByEntityAndEntityId(String entityName, Long entityId);


    Page<UserDetails> findByEntityAndEntityIdOrderByLoginName(String entityName,
            Long entityId, Pageable pageable);*/
}
