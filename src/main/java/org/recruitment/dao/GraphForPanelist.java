package org.recruitment.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;
import org.util.ConnectionClass;
import org.util.Constants;

public class GraphForPanelist {
	
	public JSONObject getApplicantsStatusGraph(int panelist_Id) throws SQLException, JSONException {
		
	    ConnectionClass db = ConnectionClass.CreateCon();
	    Connection connection = db.getConnection();
	    JSONObject json = new JSONObject();
	    
	    PreparedStatement preparedStatement = connection.prepareStatement(Constants.applicantsStatusGraphInDepartment);
	    preparedStatement.setInt(1, panelist_Id);
	    ResultSet resultSet = preparedStatement.executeQuery();
	    
	    String[] status = {"Selected", "Rejected", "Onhold"};
	     for (String state : status) {
	    	 json.put(state, 0);
		 }
	    
	    while(resultSet.next()) {
	       	json.put(resultSet.getString("Status"), resultSet.getInt("Count"));
	    }
	    
	    return json;
	}
	
	public JSONObject selectedApplicantsGraphInOpenings(int panelist_Id) throws SQLException, JSONException {
	    ConnectionClass db = ConnectionClass.CreateCon();
	    Connection connection = db.getConnection();
	    JSONObject json = new JSONObject();
	    
	    PreparedStatement preparedStatement = connection.prepareStatement(Constants.selectedApplicantsGraphInOpenings);
	    preparedStatement.setInt(1, panelist_Id);
	    ResultSet resultSet = preparedStatement.executeQuery();
	    
	    while(resultSet.next()) {
	        String departmentTitle = resultSet.getString("Openings.Description");
	        int count = resultSet.getInt("count(*)");
	        if (count == 0) {
	            json.put(departmentTitle, 0);
	        } else {
	            json.put(departmentTitle, count);
	        }
	    }
	    
	    return json;
	}
	
	public JSONObject selectedApplicantsGraphInYear(int panelist_Id) throws SQLException, JSONException {
		
		 ConnectionClass db = ConnectionClass.CreateCon();
		 Connection connection = db.getConnection();
		 JSONObject json = new JSONObject();
		    
		 PreparedStatement preparedStatement = connection.prepareStatement(Constants.selectedApplicantsGraphInYear);
	     preparedStatement.setInt(1, panelist_Id);
	     ResultSet resultSet = preparedStatement.executeQuery();

	     while (resultSet.next()) {  
	   	     json.put(resultSet.getString("year"), resultSet.getInt("count(*)"));
		 }
	     
	     return json;

	}
	
	public JSONObject departmentDetails(int panelist_Id) throws SQLException, JSONException {
		
		ConnectionClass db = ConnectionClass.CreateCon();
		Connection connection = db.getConnection();
		JSONObject jsonObject = new JSONObject();
		
		PreparedStatement preparedStatement = connection.prepareStatement("select count(*) from Openings where Openings.Department_Id in (select Department_Id from Panelist where Panelist_Id = ?) ");
		preparedStatement.setInt(1, panelist_Id);
		ResultSet resultSet = preparedStatement.executeQuery();
		
		while(resultSet.next()) {
			jsonObject.put("totalOpenings", resultSet.getInt("count(*)"));
		}
		
		preparedStatement = connection.prepareStatement("select count(*) from Job_Seeker where Job_Seeker.Department_Id in (select Department_Id from Panelist where Panelist_Id = ?) ");
		preparedStatement.setInt(1, panelist_Id);
		resultSet = preparedStatement.executeQuery();
		
		while(resultSet.next()) {
			jsonObject.put("totalApplicants", resultSet.getInt("count(*)"));
		}
		
		preparedStatement = connection.prepareStatement("select count(*) from Result join Job_Seeker on Job_Seeker.Job_Seeker_Id = Result.Job_Seeker_Id where Job_Seeker.Department_Id in (select Department_Id from Panelist where Panelist_Id = ?) and Result.Status = 'Selected'");
		preparedStatement.setInt(1, panelist_Id);
		resultSet = preparedStatement.executeQuery();
		
		while(resultSet.next()) {
			jsonObject.put("selectedApplicants", resultSet.getInt("count(*)"));
		}
		
		return jsonObject;
		
	}
	
}