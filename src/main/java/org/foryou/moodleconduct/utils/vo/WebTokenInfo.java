package org.foryou.moodleconduct.utils.vo;


import java.util.Date;

public interface WebTokenInfo{

	String WebTokenCookieName = "VEXAMINE-MOODLE-JWT-TOKEN";
	Date SessionExpirationTime =  new Date(System.currentTimeMillis() + 3600000);
	String SessionSecretKey = "manageAssets-VEXAMINE";

}