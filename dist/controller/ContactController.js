"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMessage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ContactUsModel_1 = __importDefault(require("../model/ContactUsModel"));
const sendContactMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract date from req.body
        const { name, email, content } = req.body;
        // save message to mongoDB
        const contactMessage = yield ContactUsModel_1.default.create({ name, email, content });
        // send email to website owner
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'clientvolatic@gmail.com', // Your Gmail email address
                pass: 'cycnkqypwdzosbce' // Your Gmail password
            }
        });
        const mailOptions = {
            from: `Email: ${email}`, // Your Gmail email address
            to: 'akeemsuara@gmail.com', // Website owner's email address
            // to: 'ebenezeraladesuyi@gmail.com', // Website owner's email address
            subject: 'New Message from Contact Form',
            // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>New Message from Contact Form</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong> ${content}</p>
                    </div>
                </body>
                </html>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Failed to send email' });
            }
            else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Message sent successfully' });
            }
        });
    }
    catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.sendContactMessage = sendContactMessage;
