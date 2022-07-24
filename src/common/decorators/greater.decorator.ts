import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function Greater(property: string, validationOptions?: ValidationOptions): any {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: GreaterConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Greater' })
export class GreaterConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): any {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value > relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} have to be greater than ${relatedPropertyName}`;
  }
}
