package org.foryou.moodleconduct.utils;


import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.foryou.moodleconduct.utils.vo.WebTokenInfo;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTUtil {

	public static String buildWebToken(String signedInUser) {
		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);

		JwtBuilder webTokenBuilder = Jwts.builder()
				.claim("signedInUser", signedInUser)
				.setSubject(signedInUser)
				.setIssuedAt(now)
				.setId(UUID.randomUUID().toString())
//				.setExpiration(WebTokenInfo.SessionExpirationTime)
				.signWith(SignatureAlgorithm.HS256, WebTokenInfo.SessionSecretKey);

		return webTokenBuilder.compact();
	}

	public static String getTokenSubject(HttpServletRequest httpServletRequest){
		String webToken = CookieUtil.requestTokenFromCookie(httpServletRequest);
		if(StringUtils.isEmpty(webToken)) {
			return null;
		}
		return parseCookieSession(webToken).getSubject();
	}

	public static Claims parseCookieSession(String webToken) {
		Claims jsonClaim = Jwts.parser()
				.setSigningKey(WebTokenInfo.SessionSecretKey)
				.parseClaimsJws(webToken)
				.getBody();
		return jsonClaim;
	}

}