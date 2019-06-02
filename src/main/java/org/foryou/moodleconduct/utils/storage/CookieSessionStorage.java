package org.foryou.moodleconduct.utils.storage;


public final class CookieSessionStorage {

    private static final ThreadLocal<CookieSession> THREAD_LOCAL = new ThreadLocal();

    private CookieSessionStorage() {

    }

    public static void set(CookieSession context) {
        THREAD_LOCAL.set(context);
    }

    public static void unset() {
        THREAD_LOCAL.remove();
    }

    public static CookieSession get() {
        return new CookieSession(THREAD_LOCAL.get());
    }

    public static String getCurrentUserName() {
        return get().getUserName();
    }
}
