package org.foryou.moodleconduct.utils.vo;


import javax.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CookieSessionInfo{
	
	private HttpServletResponse servletResponse;
	private String webToken;
	private Boolean httpsFlag;
	private Integer maxAge;
	private String domain;
	private String path;
	
}