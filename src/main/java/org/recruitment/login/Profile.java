package org.recruitment.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;
import org.util.ConnectionClass;

public class Profile {
	
	public JSONObject viewProfile(int id, String role) throws SQLException, JSONException {
		
		ConnectionClass db = ConnectionClass.CreateCon();
		Connection connection = db.getConnection();
		JSONObject jsonObject = new JSONObject();
	
		if(role.equalsIgnoreCase("Admin")) {
			
			PreparedStatement preparedStatement = connection.prepareStatement("select * from Admin where Admin_Id = ?");
			preparedStatement.setInt(1, id);
			ResultSet resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				jsonObject.put("name", resultSet.getString("Name"));
				jsonObject.put("email", resultSet.getString("Email"));
				jsonObject.put("role", role);
			}
		}
		
		else {
			
			PreparedStatement preparedStatement = connection.prepareStatement("select * from Panelist where Panelist_Id = ?");
			preparedStatement.setInt(1, id);
			ResultSet resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				jsonObject.put("name", resultSet.getString("Name"));
				jsonObject.put("email", resultSet.getString("Email"));
				jsonObject.put("role", role);
				jsonObject.put("gender", resultSet.getString("Gender"));
				jsonObject.put("position", resultSet.getString("Position"));
			}
		}
		return jsonObject;
	}
	
}