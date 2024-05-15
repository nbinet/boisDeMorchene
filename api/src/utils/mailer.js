import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: 2525,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

export const sendMail = async (to, subject, html) => {
    const data = {
        from: 'contact@boisdemorchene.com',
        to,
        subject,
        html
    }

    await transport.sendMail(data);
}