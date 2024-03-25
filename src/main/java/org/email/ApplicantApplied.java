package org.email;

public class ApplicantApplied {
    private String applicantName;
    private String jobTitle;
    private String companyName;
    private String yourName;
    private String yourJobTitle;
    private String date;

    public ApplicantApplied(String applicantName, String jobTitle, String companyName, String yourName, String yourJobTitle, String date) {
        this.applicantName = applicantName;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.yourName = yourName;
        this.yourJobTitle = yourJobTitle;
        this.date = date;
    }

    public String generateHtmlContent() {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body {font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;}" +
                ".container {max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}" +
                ".header {font-size: 24px; color: #333; text-align: center; padding-bottom: 20px;}" +
                ".content {font-size: 16px; color: #666; line-height: 1.6;}" +
                ".footer {text-align: center; padding-top: 20px; font-size: 14px; color: #aaa;}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>Application Received</div>" +
                "<div class='content'>" +
                "<p>Dear " + applicantName + ",</p>" +
                "<p>Thank you for applying for the " + jobTitle + " position at " + companyName + ". We have received your application and are currently in the process of reviewing it along with the other submissions.</p>" +
                "<p>We aim to complete the initial review process by " + date + ", and we will keep you updated on your application status. Should we require further information or wish to proceed to the next steps in the recruitment process, we will reach out to you directly.</p>" +
                "<p>Thank you again for your interest in joining our team. We appreciate the time and effort you have put into your application.</p>" +
                "<p>Best regards,</p>" +
                "<p>" + yourName + "<br>" + yourJobTitle + "<br>" + companyName + "</p>" +
                "</div>" +
                "<div class='footer'>This is an automated message. Please do not reply.</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    public static void main(String[] args) {
        // Example usage
        ApplicantApplied email = new ApplicantApplied("John Doe", "Software Engineer", "Tech Innovations", "Jane Smith", "HR Manager", "April 5th");
        String emailContent = email.generateHtmlContent();
        System.out.println(emailContent);
    }
}
