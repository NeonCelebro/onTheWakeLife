import { ConfigModule } from 'src/config';
import { MailerService } from './index';
import { Test, TestingModule } from '@nestjs/testing';

describe('MailerService', () => {
  let mailerService: MailerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, MailerService],
      providers: [MailerService],
    }).compile();

    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(mailerService).toBeDefined();
  });

  describe('sendRegistrationCode', () => {
    const data = {
      email: 'example@e.mail',
      code: '2222',
    };
    it('should be return data object ', async () => {
      expect(await mailerService.sendRegistrationCode(data.email, data.code));
    });

    it('should be return err object ', async () => {
      const props = {
        email: 'example@e.mail',
        code: '1234',
      };
      expect(await mailerService.sendRegistrationCode(data.email, data.code));
      expect(props.email).toEqual(data.email);
    });
  });
});
