package db.migration;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.foryou.moodleconduct.utils.PasswordUtils;
import org.foryou.moodleconduct.utils.VexamineConstants;

public class V1_201906052049__AdminLoginMigration extends BaseJavaMigration  {

	static final String superAdminUser = "admin";
	static final String superAdminPass = "V5x@m1n3";

	static final String insertCredSql = "INSERT INTO vexamine_user_credentials(mail_id, user_name, hashed_salt, hashed_password,"
			+ " create_user, update_user) VALUES (?,?,?,?,?,?)";

	static final String selectCredSql = "Select id from vexamine_user_credentials where mail_id= ?";

	static final String selectRoleSql = "Select id from vexamine_role where type= ? ";

	static final String insertAuthSql = "INSERT INTO vexamine_user_authority_info(user_id, user_role_id, create_user, update_user) VALUES (?,?,?,?)";

	@Override
	public void migrate(Context context) throws Exception {
		Connection connObject = context.getConnection();
		insertSuperAdminUser(connObject);
		authorizeSuperAdmin(connObject);
	}

	private void insertSuperAdminUser(Connection connObject) {
		try {
			PreparedStatement prepareStmt = connObject.prepareStatement(insertCredSql);
			prepareStmt.setString(1, superAdminUser);
			prepareStmt.setString(2, superAdminUser);

			String secureSalt = PasswordUtils.generateSALT(30);
			prepareStmt.setBytes(3, secureSalt.getBytes());

			byte[] hashedPassword = PasswordUtils.generateSecurePassword(superAdminPass, secureSalt);
			prepareStmt.setBytes(4, hashedPassword);

			prepareStmt.setString(5, VexamineConstants.SYSTEM_USER);
			prepareStmt.setString(6, VexamineConstants.SYSTEM_USER);

			prepareStmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void authorizeSuperAdmin(Connection connObject) {
		try {
			PreparedStatement prepareCredStmt = connObject.prepareStatement(selectCredSql);
			prepareCredStmt.setString(1, superAdminUser);
			ResultSet userCred = prepareCredStmt.executeQuery();

			PreparedStatement prepareRoleStmt = connObject.prepareStatement(selectRoleSql);
			prepareRoleStmt.setString(1, VexamineConstants.SUPER_ADMIN_ROLE);
			ResultSet userAuth = prepareRoleStmt.executeQuery();
			
			while(userCred.next() && userAuth.next()) {
				int userCredId = userCred.getInt(1);
				int userAuthId = userAuth.getInt(1);
				insertSuperAdminAuthority(connObject, userCredId, userAuthId);
			};
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private void insertSuperAdminAuthority(Connection connObject, int userCredId, int userAuthId) {
		PreparedStatement prepareAuthStmt;
		try {
			prepareAuthStmt = connObject.prepareStatement(insertAuthSql);
			prepareAuthStmt.setInt(1, userCredId);
			prepareAuthStmt.setInt(2, userAuthId);
			prepareAuthStmt.setString(3, VexamineConstants.SYSTEM_USER);
			prepareAuthStmt.setString(4, VexamineConstants.SYSTEM_USER);
			prepareAuthStmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
