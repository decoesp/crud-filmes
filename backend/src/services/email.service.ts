import nodemailer, { Transporter } from 'nodemailer';

interface SendEmailData {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail({ to, subject, html }: SendEmailData): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
      });
      console.log(`📧 Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendMovieReminderEmail(userEmail: string, movieTitle: string, releaseDate: Date): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .movie-title { font-size: 24px; font-weight: bold; color: #667eea; margin: 20px 0; }
            .date { font-size: 18px; color: #764ba2; margin: 10px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 Lembrete de Estreia!</h1>
            </div>
            <div class="content">
              <p>Olá!</p>
              <p>O filme que você cadastrou está sendo lançado hoje!</p>
              <div class="movie-title">${movieTitle}</div>
              <div class="date">Data de lançamento: ${releaseDate.toLocaleDateString('pt-BR')}</div>
              <p>Não perca a oportunidade de assistir!</p>
            </div>
            <div class="footer">
              <p>Este é um e-mail automático. Por favor, não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: userEmail,
      subject: `🎬 Lembrete: ${movieTitle} estreia hoje!`,
      html,
    });
  }
}
