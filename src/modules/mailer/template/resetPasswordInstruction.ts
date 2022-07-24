import { LanguageTypeEnum } from 'src/common/enums/language-type-enum';
export default (mail: string, code: string, language: LanguageTypeEnum): string => {
  if (language == LanguageTypeEnum.EN)
    return `Hi, ${mail}, your temporary password in the app ${code}`;
  if (language == LanguageTypeEnum.RU)
    return `Привет, ${mail}, твой временный пароль в приложение ${code}`;

  return `Tere, ${mail}, teie ajutine rakenduse parool ${code}`;
};
