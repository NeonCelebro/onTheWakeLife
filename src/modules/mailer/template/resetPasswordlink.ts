export const EN = (url: string): string => ` <h1>Hello,</h1> 
  <p>We received a request to change a password for your account. If you made this request, you can reset your password by clicking the following link:</p>
  <a href="${url}">Reset password </a>
  <p>If you ignore this message, your password will not be changed. If you didn’t request to reset your password, let us know by replying directly to this email.</p>`;

export const ET = (url: string): string => ` <h1>Tere,</h1> 
  <p>Saime taotluse teie konto parooli muutmiseks. Kui olete selle taotluse teinud, saate parooli lähtestada, klõpsates järgmisel lingil:</p>
  <a href="${url}">Lähtesta parool </a>
  <p>Kui ignoreerite seda sõnumit, ei muudeta teie parooli. Kui te ei taotlenud parooli lähtestamist, andke meile sellest teada, vastates otse sellele e-kirjale.</p>`;

export const RU = (url: string): string => ` <h1>Здравствуйте,</h1> 
  <p>Мы получили запрос на изменение пароля от вашего аккаунта. Если Вы являетесь инициатором этого действия, то Вы можете изменить пароль, перейдя по ссылке:</p>
  <a href="${url}">Изменить пароль</a>
  <p>Если вы проигнорируете это сообщение, пароль останется прежним. Если Вы не совершали этого действия, сообщите нам об этом, ответив на данное письмо. </p>`;
