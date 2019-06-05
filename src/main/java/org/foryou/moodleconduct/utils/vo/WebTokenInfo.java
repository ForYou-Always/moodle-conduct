package org.foryou.moodleconduct.utils.vo;


import java.util.Date;

public interface WebTokenInfo{

	String WebTokenCookieName = "ASSET-MANAGEMENT-JWT-TOKEN";
	Date SessionExpirationTime =  new Date(System.currentTimeMillis() + 3600000);
	String SessionSecretKey = "manageAssets-VEXAMINE";

}