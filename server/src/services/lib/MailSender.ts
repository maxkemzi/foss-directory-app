import {env} from "#src/config";
import nodemailer from "nodemailer";

class MailSender {
	static transporter = nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: env.SMTP_PORT,
		secure: false,
		auth: {
			user: env.SMPT_USER,
			pass: env.SMTP_PASSWORD
		}
	});

	static async send(opts: {
		to: string;
		subject: string;
		text?: string;
		html?: string;
	}) {
		const {to, subject, text, html} = opts;

		await this.transporter.sendMail({
			from: env.SMPT_USER,
			to,
			subject,
			text,
			html
		});
	}
}

export default MailSender;
