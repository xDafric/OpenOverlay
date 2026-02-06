import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export class Mail {
  testAccount: nodemailer.TestAccount | null = null;
  transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  > | null = null;

  constructor() {
    this.setupTestAccount();
  }

  private async setupTestAccount() {
    this.testAccount = await nodemailer.createTestAccount();
    console.log("Test account created:");
    console.log("  User: %s", this.testAccount.user);
    console.log("  Pass: %s", this.testAccount.pass);
    this.setupTransporter();
  }

  private setupTransporter() {
    if (this.testAccount) {
      this.transporter = nodemailer.createTransport({
        host: this.testAccount.smtp.host,
        port: this.testAccount.smtp.port,
        secure: this.testAccount.smtp.secure,
        auth: {
          user: this.testAccount.user,
          pass: this.testAccount.pass,
        },
      });
    }
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions) {
    if (this.transporter) {
      const message = await this.transporter.sendMail({
        ...mailOptions,
        from: "Test",
      });

      console.log("Message Sent: " + nodemailer.getTestMessageUrl(message));
    } else {
      console.error("Email Could not be sent");
    }
  }
}
