package org.foryou.moodleconduct.utils.storage;


import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CookieSession {

    public CookieSession(CookieSession cookie) {
        this.time = format.format(new Date());
        this.webToken = cookie.getWebToken();
        this.sessionId = cookie.getSessionId();
        this.userName = cookie.getUserName();
        this.userRole = cookie.getUserRole();
        this.remoteIp = cookie.getRemoteIp();
    }

    @Getter(AccessLevel.PRIVATE)
    @Setter(AccessLevel.PRIVATE)
    private SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss.SSS z");

    private String time = format.format(new Date());

    private String webToken;
    //private String msaToken;
    /*authentication*/
    private String sessionId;
    private String userName;
    private String userRole;
    private String remoteIp;

}
