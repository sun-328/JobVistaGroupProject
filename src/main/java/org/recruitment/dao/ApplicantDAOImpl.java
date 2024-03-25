package org.recruitment.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.email.ApplicantApplied;
import org.email.EmailClass;
import org.recruitment.dto.ApplicantDTO;
import org.util.ConnectionClass;

public class ApplicantDAOImpl implements ApplicantDAO {
    @Override
    public boolean addApplicant(ApplicantDTO applicantDTO) {
        try (Connection connection = ConnectionClass.CreateCon().getConnection()) {
            String query = "INSERT INTO Job_Seeker (Name, Email, DOB, Gender, Experience, Department_Id, Phone, Qualification) " +
                           "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, applicantDTO.getName());
                preparedStatement.setString(2, applicantDTO.getEmail());
                preparedStatement.setDate(3, applicantDTO.getDob());
                preparedStatement.setString(4, applicantDTO.getGender().getValue());
                preparedStatement.setInt(5, applicantDTO.getExperience());
                preparedStatement.setInt(6, applicantDTO.getDepartmentId());
                preparedStatement.setString(7, applicantDTO.getPhoneNo());
                preparedStatement.setString(8, applicantDTO.getQualification());
//                preparedStatement.setString(9, applicantDTO.getPhoto());
                
                int rowsAffected = preparedStatement.executeUpdate();
                
                return rowsAffected > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean removeApplicant(String name, String email) {
        try (Connection connection = ConnectionClass.CreateCon().getConnection()) {
            String query = "DELETE FROM Job_Seeker WHERE Name LIKE ? AND Email LIKE ?";
            
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, "%" + name + "%");
                preparedStatement.setString(2, "%" + email + "%");
                
                int rowsAffected = preparedStatement.executeUpdate();
                
                return rowsAffected > 0;
            }
        } catch (SQLException e) {
        	e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean applyForJob(String name, String email, int openingId) {
        try (Connection connection = ConnectionClass.CreateCon().getConnection()) {
            String query = "SELECT Job_Seeker_Id FROM Job_Seeker WHERE Name LIKE ? AND Email LIKE ?";
            
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, "%" + name + "%");
                preparedStatement.setString(2, "%" + email + "%");
                
                ResultSet rs = preparedStatement.executeQuery();
                
                while (rs.next()) {
                    int applicantId = rs.getInt("Job_Seeker_Id");
                    String applyQuery = "INSERT ignore INTO Application (Job_Seeker_Id, Opening_Id, Date) VALUES (?, ?, ?)";
                    
                    try (PreparedStatement applyStatement = connection.prepareStatement(applyQuery)) {
                        applyStatement.setInt(1, applicantId);
                        applyStatement.setInt(2, openingId);
                        applyStatement.setDate(3, java.sql.Date.valueOf(java.time.LocalDate.now()));
                        
                        int rowsAffected = applyStatement.executeUpdate();
                        
                        
                        if(rowsAffected > 0) {
                        String qurry = "SELECT \n"
                                + "    Organization.Name AS OrganizationName,\n"
                                + "    Openings.Description AS OpeningDescription,\n"
                                + "    Openings.Start_Date as Date,\n"
                                + "    Panelist.Name AS PanelistName,\n"
                                + "    Panelist.Position AS PanelistPosition\n"
                                + "FROM \n"
                                + "    Openings\n"
                                + "    JOIN Panelist ON Openings.Panelist_Id = Panelist.Panelist_Id\n"
                                + "    JOIN Organization ON Panelist.Org_Id = Organization.Org_Id\n"
                                + "WHERE \n"
                                + "    Openings.Opening_Id = ?";
                                
                                
                                PreparedStatement selectJob = connection.prepareStatement(qurry);
                                selectJob.setInt(1, openingId);
                                ResultSet jobrs = selectJob.executeQuery();
                                
                                if(jobrs.next()) {
                                
                                ApplicantApplied applied = new ApplicantApplied(name, jobrs.getString("OpeningDescription"), jobrs.getString("OrganizationName"), jobrs.getString("PanelistName"), jobrs.getString("PanelistPosition"), jobrs.getDate("Date").toString());
                                EmailClass mail = new EmailClass(email, applied.generateHtmlContent(), "Application Received");
                                mail.sendMail();
                                }
                        }
                        
                        
                        return rowsAffected > 0;
                    }
                }
            }
        } catch (SQLException e) {
        	e.printStackTrace();
            return false;
        }
		return false;
    }
    
    

}
