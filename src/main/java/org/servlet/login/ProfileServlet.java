package org.servlet.login;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.recruitment.login.*;
import org.util.CommonLogger;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Profile
 */
@WebServlet("/Profile")
public class ProfileServlet extends HttpServlet {

	Logger logger = CommonLogger.getCommon().getLogger(ProfileServlet.class);
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProfileServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(HttpServletResponse.SC_OK);
    }
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
	    JSONObject responseData = new JSONObject();
		
		
		StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
		
		int id = 0;
		String role = null;
		try {
			JSONObject jsonObject = new JSONObject(sb.toString());
			JSONObject userDetails = jsonObject.getJSONObject("userDetails");
			role = userDetails.getString("role");
			if(role.equalsIgnoreCase("Admin")){
				id = userDetails.getInt("Org_Id");
			}
			else {
				id = userDetails.getInt("Panelist_Id");
			}
		} 
		
		catch (JSONException e) {
		
			logger.error(role+id+": "+"json exception while getting data from json object \n"+e.getMessage());
			try {
				responseData.put("statusCode", 500);
				responseData.put("message", "Error parsing JSON object.");
			} 
	    	catch (JSONException e1) {
	    		logger.error(role+id+": "+"\nError parsing JSON object." + e1.getMessage());
			}
			e.printStackTrace();
		
		}
		
	    try {
	       Profile profile = new Profile();
	       JSONObject jsonObject = profile.viewProfile(id, role);
	       responseData.put("statusCode", 500);
	       responseData.put("message", jsonObject);
	    } 
	    catch (JSONException e) {
	        
	    	logger.error(role+id+": "+"\nError parsing JSON object.\n" + e.getMessage());
	    	try {
				responseData.put("statusCode", 500);
				responseData.put("message", "Error parsing JSON object.");
			} 
	    	catch (JSONException e1) {
	    		logger.error(role+id+": "+"\nError parsing JSON object." + e1.getMessage());
			}
	        e.printStackTrace();
	    } 
	    catch (SQLException e) {
	      
	    	try {
				responseData.put("statusCode", 500);
				responseData.put("message", "Error occurred while retrieving data from the database.");
			} 
	    	catch (JSONException e1) {
	    		logger.error(role+id+": "+"\nError parsing JSON object.\n" + e1.getMessage());
			}
	    	logger.error(role+id+": "+"\nError occurred while retrieving data from the database. \n"+e.getMessage());
	        e.printStackTrace();
	    }
	    response.getWriter().write(responseData.toString());
	
	}
}