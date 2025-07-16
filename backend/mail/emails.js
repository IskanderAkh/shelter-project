import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import {
    WELCOMING_EMAIL_TEMPLATE,
    ORDER_CHECKOUT_TEMPLATE,
} from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({ from, to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });
        console.log("Email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending email", error);
        console.error("Error details:", error.response); // Log response from server
        throw new Error(`Error sending email: ${error.message}`);
    }
};


export const sendWelcomeEmail = async (email, name) => {
    const html = WELCOMING_EMAIL_TEMPLATE.replace("{name}", name);
    await sendEmail({
        from: `"Marketassist.ru" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Добро пожаловать в Marketassist!",
        html,
    });
};

export const sendOrderConfirmationEmail = async (user, productRows, grandTotal) => {
    const emailHtml = ORDER_CHECKOUT_TEMPLATE
        .replace("{productRows}", productRows)
        .replace("{grandTotal}", grandTotal);

    await sendEmail({
        from: `"Uzbek Souvenir Shop" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Подтверждение вашего заказа",
        html: emailHtml,
    });
};
