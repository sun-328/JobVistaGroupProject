package org.email;


import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailClass{
	
	
	String to;
	String contant;
	String subject;
	
	
	
    public EmailClass(String to, String contant, String subject) {
		this.to = to;
		this.contant = contant;
		this.subject = subject;
		
	}

	public void sendMail() {
		System.out.println("Atleast in Mail class");

        String from = "dudemy09@gmail.com";

        
        String host = "smtp.gmail.com";

        
        System.setProperty("https.protocols", "TLSv1.2");
        

        Properties properties = System.getProperties();
        properties.put("mail.smtp.starttls.enable", "true");
        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        
        
        System.out.println("After Prob Mail class");
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication("dudemy09@gmail.com", "dpzr pord mtlg xtgi");

            }

        });
        
        System.out.println("After Session ");
        // Used to debug SMTP issues
//        session.setDebug(true);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject(subject);

 
            message.setContent(contant,"text/html");

            System.out.println("sending...");

            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
	
	public static void main(String[] args) {
		EmailClass nEmailClass = new EmailClass("jitgf@d_mail.com", new PanelistMail("name", "CName", "Pass").generateHtmlContent(),"Working");
		nEmailClass.sendMail();
	}

	
}

