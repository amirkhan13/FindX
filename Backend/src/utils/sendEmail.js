import nodemailer from 'nodemailer';


export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"FindX Admin" <${process.env.ADMIN_EMAIL}>`, 
        to: options.to, 
        subject: options.subject, 
        text: options.text, 
    };

    try {
        
        await transporter.sendMail(mailOptions);
        
    } catch (error) {
      
        throw new Error('Error sending email');
    }
};
