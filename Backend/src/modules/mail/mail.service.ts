import transporter, { loadTemplate } from './nodemailer';

class MailService {
  async sendValidateEmail(email: string, token: string): Promise<boolean> {
    const link = `${process.env.FRONTEND_URL}/acess/validationemail?token=${token}`;

    const html = loadTemplate('template_validation_email', { link, email });

    transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Validação de E-mail',
      html,
    });

    return true;
  }

  async sendForgetPasswordEmail(email: string, token: string, code: string): Promise<boolean> {
    const link = `${process.env.FRONTEND_URL}/acess/resetpassword?token=${token}`;

    const html = loadTemplate('template_reset_password', { link, email, code });

    transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Redefinição de Senha',
      html,
    });

    return true;
  }

  async sendResetPasswordEmail(email: string): Promise<boolean> {
    const html = loadTemplate('template_confirm_password', { email });

    transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Senha Alterada',
      html,
    });

    return true;
  }
}

export const mailService = new MailService();
