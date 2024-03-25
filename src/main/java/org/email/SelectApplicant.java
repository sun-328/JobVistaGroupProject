package org.email;



public class SelectApplicant {

    private String jobTitle;
    private String candidateName;
    private String companyName;
    private String yourName;
    private String yourJobTitle;

    // Constructor
    public SelectApplicant(String jobTitle, String candidateName, String companyName, String yourName, String yourJobTitle) {
        this.jobTitle = jobTitle;
        this.candidateName = candidateName;
        this.companyName = companyName;
        this.yourName = yourName;
        this.yourJobTitle = yourJobTitle;
    }

    // Method to generate the final HTML content
    public String generateHtmlContent() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                font-size: 24px;
                color: #333;
                text-align: center;
                padding-bottom: 20px;
            }
            .content {
                font-size: 16px;
                color: #666;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 14px;
                color: #aaa;
            }
            </style>
            </head>
            <body>
            <div class='container'>
                <div class='header'>Offer of Employment - %s</div>
                <div class='content'>
                    
                    <p>

            Dear %s,

            I hope this message finds you well. On behalf of %s, I am thrilled to extend to you the offer for the position of %s. Your skills, experience, and enthusiasm stood out to us during the selection process, and we are excited about the prospect of you joining our team.</p>
                    
                    <p>Best regards,</p>
                    <p>%s<br>%s<br>%s</p>
                </div>
                <div class='footer'>This is an automated message. Please do not reply directly to this email.</div>
            </div>
            </body>
            </html>""".formatted(jobTitle, candidateName, companyName, jobTitle, yourName, yourJobTitle, companyName);
    }

    public static void main(String[] args) {
        // Create an instance of EmploymentOfferEmail with sample data
        SelectApplicant email = new SelectApplicant(
                "Software Engineer",
                "Jane Doe",
                "Tech Innovations Inc.",
                "John Smith",
                "HR Manager");

        // Generate and print the final HTML content
        String finalHtmlContent = email.generateHtmlContent();
        System.out.println(finalHtmlContent);
    }
}

