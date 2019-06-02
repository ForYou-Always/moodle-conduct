package org.foryou.moodleconduct.utils;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.foryou.moodleconduct.utils.storage.CookieSession;
import org.foryou.moodleconduct.utils.storage.CookieSessionStorage;
import org.foryou.moodleconduct.utils.vo.CookieSessionInfo;
import org.foryou.moodleconduct.utils.vo.WebTokenInfo;
import org.springframework.web.util.WebUtils;

import io.jsonwebtoken.Claims;

public class CookieUtil {
	
	
    public static Cookie create(CookieSessionInfo cookieSessionInfo) {
        Cookie cookie = new Cookie(WebTokenInfo.WebTokenCookieName, cookieSessionInfo.getWebToken());
        cookie.setSecure(cookieSessionInfo.getHttpsFlag());
//        cookie.setDomain(cookieSessionInfo.getDomain());// domain-name if exists. Ex: https://dellainfotech.com/
        cookie.setMaxAge(cookieSessionInfo.getMaxAge());
        cookie.setPath(cookieSessionInfo.getPath());
        cookie.setHttpOnly(true);
        return cookie;
    }

    public static void destroy(HttpServletResponse servletResponse) {
        Cookie cookie = new Cookie(WebTokenInfo.WebTokenCookieName, null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        servletResponse.addCookie(cookie);
    }

    public static String requestTokenFromCookie(HttpServletRequest servletRequest) {
        Cookie sessionCookie = WebUtils.getCookie(servletRequest, WebTokenInfo.WebTokenCookieName);
        return sessionCookie != null ? sessionCookie.getValue() : null;
    }
    
    public static void localCookieStorage(HttpServletRequest httpRequest, Claims jsonClaim) {
    	CookieSession cookieSession = CookieSession.builder()
    			.userName((String) jsonClaim.get("signedInUser"))
    			.userRole(null)
    			.remoteIp(httpRequest.getRemoteAddr())
    			.sessionId(jsonClaim.getId())
    			.build();
        CookieSessionStorage.set(cookieSession);
    } 
}

