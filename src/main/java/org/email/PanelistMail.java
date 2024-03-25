package org.email;

public class PanelistMail {
    private String recipientName;
    private String companyName;
    private String password;

    public PanelistMail(String recipientName, String companyName, String password) {
        this.recipientName = recipientName;
        this.companyName = companyName;
        this.password = password;
    }

    public String generateHtmlContent() {
    	
    	
    	System.out.println("befMaket");
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
                "<div class='header'>Job Interview Invitation</div>" +
                "<div class='content'>" +
                "<p>Dear " + recipientName + ",</p>" +
                "<p>You have been assigned as a panelist in an interview at our company. Please use JobVista to contact the candidates and schedule the interviews.</p>" +
                "<p>Your Password: " + password + "</p>" +
                "<p>Thank you for your cooperation.</p>" +
                "<p>Best regards,</p>" +
                "<p>" + companyName + "</p>" +
                "</div>" +
                "<div class='footer'>This is an automated message. Please do not reply.</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    public static void main(String[] args) {
        // Example usage
        PanelistMail invitation = new PanelistMail("Jith", "Your Company Name", "xxxxxx");
        String htmlContent = invitation.generateHtmlContent();
        System.out.println(htmlContent);
    }
}
