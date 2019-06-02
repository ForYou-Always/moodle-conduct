package org.foryou.moodleconduct.dao.vo;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpForm{
	private String mailId;
	private String password;
	private List<String> authority;
}
