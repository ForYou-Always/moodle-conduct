package org.foryou.moodleconduct.utils;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Random;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class PasswordUtils {
	private static final Random RANDOM = new SecureRandom();
	private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	private static final int ITERATIONS = 5000;
	private static final int KEY_LENGTH = 256;
	private static final String encryptionAlgorithm = "PBKDF2WithHmacSHA1"; //CPU intensive algorithm.

	public static String generateSALT(int length) {
		StringBuilder returnValue = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
		}
		return new String(returnValue);
	}

	public static byte[] hashPasswordWithSalt(char[] password, byte[] salt) {
		PBEKeySpec keySpec = new PBEKeySpec(password, salt, ITERATIONS, KEY_LENGTH);
		Arrays.fill(password, Character.MIN_VALUE);
		try {
			SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(encryptionAlgorithm);
			return secretKeyFactory.generateSecret(keySpec).getEncoded();
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new AssertionError("Error while hashing a password: " + e.getMessage(), e);
		} finally {
			keySpec.clearPassword();
		}
	}

	public static byte[] generateSecurePassword(String password, String salt) {
		return hashPasswordWithSalt(password.toCharArray(), salt.getBytes());
	}
	
	public static String generateMd5SALT(int length) throws NoSuchAlgorithmException  {
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(generateSALT(10).getBytes());
		byte[] bytes = md.digest(generateSALT(10).getBytes());
		StringBuilder md5SaltBuilder = new StringBuilder();
		for(int i=0; i< bytes.length ;i++)
		{
			md5SaltBuilder.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
		}
		return md5SaltBuilder.toString();
	}
}
