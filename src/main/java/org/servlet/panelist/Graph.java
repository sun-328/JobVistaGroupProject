package org.servlet.panelist;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.recruitment.dao.GraphForPanelist;
import org.util.CommonLogger;


/**
 * Servlet implementation class Graphs
 */
@WebServlet("/Graph")
public class Graph extends HttpServlet {
	
	Logger logger = CommonLogger.getCommon().getLogger(Graph.class);
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Graph() {
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
	    GraphForPanelist graphForPanelist = new GraphForPanelist();
		
		StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
		
//		int orgId = 0;
		int panelistId = 0;
		try {
			JSONObject jsonObject = new JSONObject(sb.toString());
			JSONObject userDetails = jsonObject.getJSONObject("userDetails");
//			orgId = userDetails.getInt("Org_Id");
			panelistId = userDetails.getInt("Panelist_Id");
		
		} 
		
		catch (JSONException e) {
		
			logger.error("json exception while getting data from json object \n"+e.getMessage());
		
		}
		
	    try {
	        
	        JSONObject getApplicantsStatusGraph = graphForPanelist.getApplicantsStatusGraph(panelistId);
	        JSONObject selectedApplicantsGraphInOpenings = graphForPanelist.selectedApplicantsGraphInOpenings(panelistId);
	        JSONObject selectedApplicantsGraphInYear = graphForPanelist.selectedApplicantsGraphInYear(panelistId);
	        JSONObject departmentDetails = graphForPanelist.departmentDetails(panelistId);
	        
	        responseData.put("statusCode", 200);
	        responseData.put("getApplicantsStatusGraph", getApplicantsStatusGraph);
	        responseData.put("selectedApplicantsGraphInOpenings", selectedApplicantsGraphInOpenings);
	        responseData.put("selectedApplicantsGraphInYear", selectedApplicantsGraphInYear);
	        responseData.put("departmentDetails", departmentDetails);
	        
	    } 
	    catch (JSONException e) {
	        
	    	logger.error("Panelist:"+panelistId+"\nError parsing JSON object.\n" + e.getMessage());
	    	try {
				responseData.put("statusCode", 500);
				responseData.put("message", "Error parsing JSON object.");
			} 
	    	catch (JSONException e1) {
	    		logger.error("Panelist:"+panelistId+"\nError parsing JSON object." + e1.getMessage());
			}
	        e.printStackTrace();
	    } 
	    catch (SQLException e) {
	      
	    	try {
				responseData.put("statusCode", 500);
				responseData.put("message", "Error occurred while retrieving data from the database.");
			} 
	    	catch (JSONException e1) {
	    		logger.error("Panelist:"+panelistId+"\nError parsing JSON object.\n" + e1.getMessage());
			}
	    	logger.error("Panelist:"+panelistId+"\nError occurred while retrieving data from the database. \n"+e.getMessage());
	        e.printStackTrace();
	    }
	    response.getWriter().write(responseData.toString());
	
	}

}