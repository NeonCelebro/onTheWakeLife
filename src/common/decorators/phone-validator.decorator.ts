import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const CODES_SET = new Set([
  '43',
  '375',
  '32',
  '420',
  '45',
  '327',
  '358',
  '33',
  '49',
  '30',
  '36',
  '39',
  '371',
  '370',
  '373',
  '31',
  '47',
  '48',
  '351',
  '40',
  '7',
  '381',
  '421',
  '386',
  '34',
  '46',
  '41',
  '380',
  '44',
  '1',
]); // Здесь должен быть set из кодов телефонов
@ValidatorConstraint({ name: 'IsValidPhoneNumber', async: false })
export class IsValidPhoneCodeConstraint implements ValidatorConstraintInterface {
  validate(code: string): boolean {
    return CODES_SET.has(code);
  }

  defaultMessage(): string {
    // here you can provide default error message if validation failed
    return 'Phone number is not valid!';
  }
}

export function IsValidPhoneCode(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPhoneCodeConstraint,
    });
  };
}
