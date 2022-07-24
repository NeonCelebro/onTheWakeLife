import { Injectable } from '@nestjs/common';
import { config, SES } from 'aws-sdk';
import registrationCodeLetter from './template/registrationCodeLetter';
import approvedCompanyLetter from './template/approvedCompanyLetter';
import { ConfigService } from 'src/config';
import declinedCompanyLetter from './template/declinedCompanyLetter';
import resetPasswordInstruction from './template/resetPasswordInstruction';
import initPasswordLetter from './template/initPasswordLetter';
import * as resetPasswordlink from './template/resetPasswordlink';
import acceptedPayment from './template/acceptedPayment';
import failedPayment from './template/failedPayment';
import failedSubscriptionPayment from './template/failedSubscriptionPayment';
import toSupportFromPartnerHtml from './template/toSupportFromPartner';
import { LanguageTypeEnum } from 'src/common/enums/language-type-enum';
import { PartnerEntity } from '../partners/entities/partner.entity';
import bookingInvoice from './template/bookingInvoice';
import { ClassEntity } from '../classes/entities/class.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class MailerService {
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly region: string;
  private readonly senderEmail: string;
  private readonly ses: any;
  private readonly clientUrl: string;

  /**
     * [description]
     * @param configService

     */
  constructor(private readonly configService: ConfigService) {
    this.accessKeyId = this.configService.get('ACCESS_KEY_ID');
    this.secretAccessKey = this.configService.get('SECERT_ACEESS_KEY');
    this.region = this.configService.get('REGION');
    this.senderEmail = this.configService.get('SENDER_EMAIL');
    this.clientUrl = this.configService.get('CLIENT_URL');

    config.update({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
    });
    this.ses = new SES({ apiVersion: '2010-12-01' });
  }

  public sendRegistrationCode(email: string, code: string): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: registrationCodeLetter(email, code),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendDeclinedCompany(email: string, companyName: string): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: declinedCompanyLetter(email, companyName),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendResetPasswordCode(email: string, code: string, language: LanguageTypeEnum): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: resetPasswordInstruction(email, code, language),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendApprovedCompany(email: string, password: string, companyName: string): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: approvedCompanyLetter(email, password, companyName),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendInitPassword(email: string, password: string): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: initPasswordLetter(password),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendResetPasswordLink(email: string, secret: string, language: string, role: string): any {
    const resetUrl = `${this.clientUrl}/${role.toLowerCase()}/auth/reset-password`;
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: resetPasswordlink[language](resetUrl),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendPaymentSucceeded(
    email: string,
    amount: number,
    balancePoints: number,
    firstName: string,
    lastName: string,
  ): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: acceptedPayment(email, amount, balancePoints, firstName, lastName),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendPaymentFails(email: string, amount: number): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: failedPayment(email, amount),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendSubscriptionPaymentFails(email: string): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: failedSubscriptionPayment(email),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }

  public sendToSupportFromPartner(
    partner: PartnerEntity,
    email: string,
    subject: string,
    message: string,
  ): any {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: toSupportFromPartnerHtml(partner, message),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else {
        console.log(data);
        return data;
      }
    });
  }

  public sendBookingInvoice(
    user: Partial<UserEntity>,
    amount: number,
    classExemplar: ClassEntity,
  ): any {
    const params = {
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: bookingInvoice(user, amount, classExemplar),
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: `<${this.senderEmail}>`,
    };
    this.ses.sendEmail(params, function (err: any, data: any) {
      if (err) return err;
      else return data;
    });
  }
}
