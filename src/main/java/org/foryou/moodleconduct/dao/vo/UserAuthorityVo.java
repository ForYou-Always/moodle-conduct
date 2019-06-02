package org.foryou.moodleconduct.dao.vo;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuthorityVo {
	private String signedInUser;
	private String mailId;
	private List<String> roles;
}
