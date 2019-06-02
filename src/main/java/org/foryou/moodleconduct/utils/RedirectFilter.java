package org.foryou.moodleconduct.utils;


import java.io.IOException;
import java.security.SignatureException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RedirectFilter implements Filter {

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws ServletException, IOException {
		HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
		HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

		String requestURI = httpRequest.getRequestURI();
		String redirectURI = httpRequest.getContextPath() + "/login";

		boolean isLoggedIn = validateSession(httpRequest, httpResponse);
		boolean isStatic = allowStaticResources(requestURI);
		boolean isLogin = allowLoginFiles(requestURI);

		if(isLoggedIn) {
			if(isLogin || requestURI.equals("/")) {
				httpResponse.sendRedirect(httpRequest.getContextPath() + "/home");
			} else {
				chain.doFilter(httpRequest, httpResponse);
			}
		} else if(isStatic){
			chain.doFilter(httpRequest, httpResponse);
		} else if(isLogin){
			chain.doFilter(httpRequest, httpResponse);
		} else {
			httpResponse.sendRedirect(redirectURI);
		}
	}

	private boolean validateSession(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
		String webToken = CookieUtil.requestTokenFromCookie(httpRequest);
		if(!StringUtils.isEmpty(webToken)) {
			try {
				Claims jsonClaim = JWTUtil.parseCookieSession(webToken); // store the information in ThreadLocal.
				CookieUtil.localCookieStorage(httpRequest, jsonClaim);
				return true;
			} catch(ExpiredJwtException | MalformedJwtException e) {
				CookieUtil.destroy(httpResponse);
				return false;
			}
		}
		return false;
	}

	private boolean allowLoginFiles(String requestURI) {
		return (requestURI.contains("login") || requestURI.contains("sign-up"));
	}

	private boolean allowStaticResources(String requestURI) {
		return (requestURI.contains("built/") || requestURI.contains(".png")
				|| requestURI.contains(".jpg"));
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("init======================================");
	}

	@Override
	public void destroy() {
		System.out.println("destroy======================================");
	}

}