package org.email;

public class RejectCandidate {

    private String jobTitle;
    private String candidateName;
    private String companyName;
    private String yourName;
    private String yourJobTitle;

    // Constructor
    public RejectCandidate(String jobTitle, String candidateName, String companyName, String yourName, String yourJobTitle) {
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
                <div class='header'>%s Position at %s</div>
                <div class='content'>
                    <p>Dear %s,</p>
                    <p>Thank you for your interest in the %s position at %s. After careful consideration, we have decided to move forward with another candidate. We appreciate your time and effort in applying and wish you the best in your job search.</p>
                    <p>Best,</p>
                    <p>%s<br>%s</p>
                </div>
            </div>
            </body>
            </html>""".formatted(jobTitle, companyName, candidateName, jobTitle, companyName, yourName, yourJobTitle);
    }

    public static void main(String[] args) {
        // Create an instance of RejectionEmail with sample data
        RejectCandidate email = new RejectCandidate(
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

