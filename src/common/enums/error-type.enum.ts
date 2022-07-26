export enum ErrorTypeEnum {
  FILE_ALREADY_EXIST = 'FILE_ALREADY_EXIST',
  FILES_NOT_FOUND = 'FILES_NOT_FOUND',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',

  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  USERS_NOT_FOUND = 'USERS_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  AUTH_INCORRECT_CREDENTIALS = 'AUTH_INCORRECT_CREDENTIALS',
  AUTH_INVALID_TOKEN = 'AUTH_INVALID_TOKEN',
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  AUTH_FORBIDDEN = 'AUTH_FORBIDDEN',
  AUTH_PASSWORDS_DO_NOT_MATCH = 'AUTH_PASSWORDS_DO_NOT_MATCH',

  PARTNER_DO_NOT_YET_VERIFIED = 'PARTNER_DO_NOT_YET_VERIFIED',
  PARTNER_DECLINED = 'PARTNER_DECLINED',
  PARTNER_ALREADY_EXIST = 'PARTNER_ALREADY_EXIST',
  PARTNERS_NOT_FOUND = 'PARTNERS_NOT_FOUND',
  PARTNER_NOT_FOUND = 'PARTNER_NOT_FOUND',

  STUDIO_ALREADY_EXIST = 'STUDIO_ALREADY_EXIST',
  STUDIOS_NOT_FOUND = 'STUDIOS_NOT_FOUND',
  STUDIO_NOT_FOUND = 'STUDIO_NOT_FOUND',

  STUDIOS_CONTACT_PERSON_INFO_ALREADY_EXIST = 'STUDIOS_CONTACT_PERSON_INFO_ALREADY_EXIST',
  STUDIOS_CONTACT_PERSON_INFO_NOT_FOUND = 'STUDIOS_CONTACT_PERSON_INFO_NOT_FOUND',
  STUDIO_ALREADY_HAVE_CONTACT_PERSON_INFO = 'STUDIO_ALREADY_HAVE_CONTACT_PERSON_INFO',

  BOOKING_ALREADY_EXIST = 'BOOKING_ALREADY_EXIST',
  BOOKINGS_NOT_FOUND = 'BOOKINGS_NOT_FOUND',
  BOOKING_NOT_FOUND = 'BOOKING_NOT_FOUND',
  BOOKING_CAN_NOT_BE_CREATED = 'BOOKING_CAN_NOT_BE_CREATED',

  STUDIO_ALREADY_HAVE_LEGAL_INFO = 'STUDIO_ALREADY_HAVE_LEGAL_INFO',
  STUDIO_LEGAL_INFO_ALREADY_EXIST = 'STUDIO_LEGAL_INFO_ALREADY_EXIST',
  STUDIO_LEGAL_INFO_NOT_FOUND = 'STUDIO_LEGAL_INFO_NOT_FOUND',

  STUDIO_PRICE_ALREADY_EXIST = 'STUDIO_PRICE_ALREADY_EXIST',
  STUDIO_PRICE_NOT_FOUND = 'STUDIO_PRICE_NOT_FOUND',

  STUDIO_PAYMENT_INFO_ALREADY_EXIST = 'STUDIO_PAYMENT_INFO_ALREADY_EXIST',
  STUDIO_ALREADY_HAVE_PAYMENT_INFO = 'STUDIO_ALREADY_HAVE_PAYMENT_INFO',
  STUDIO_PAYMENT_INFO_NOT_FOUND = 'STUDIO_PAYMENT_INFO_NOT_FOUND',

  STUDIO_SOCIAL_NETWORK_ALREADY_EXIST = 'STUDIO_SOCIAL_NETWORK_ALREADY_EXIST',
  STUDIO_SOCIAL_NETWORK_NOT_FOUND = 'STUDIO_SOCIAL_NETWORK_NOT_FOUND',

  STUDIO_ALREADY_HAVE_MAX_IMAGES = 'STUDIO_ALREADY_HAVE_MAX_IMAGES',

  CITY_ALREADY_EXIST = 'CITY_ALREADY_EXIST',
  CITIES_NOT_FOUND = 'CITIES_NOT_FOUND',
  CITY_NOT_FOUND = 'CITY_NOT_FOUND',

  CATEGORY_ALREADY_EXIST = 'CATEGORY_ALREADY_EXIST',
  CATEGORIES_NOT_FOUND = 'CATEGORIES_NOT_FOUND',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',

  ADDSETTING_ALREADY_EXIST = 'ADDITIONAL_SETTING_ALREADY_EXIST',
  ADDSETTINGS_NOT_FOUND = 'ADDITIONAL_SETTING_NOT_FOUND',
  ADDSETTING_NOT_FOUND = 'ADDITIONAL_SETTING_NOT_FOUND',

  SUBSCR_PLAN_ALREADY_EXIST = 'SUBSCRIPTION_PLAN_ALREADY_EXIST',
  SUBSCR_PLANS_NOT_FOUND = 'SUBSCRIPTION_PLANS_NOT_FOUND',
  SUBSCR_PLAN_NOT_FOUND = 'SUBSCRIPTION_PLAN_NOT_FOUND',

  INSTRUCTOR_ALREADY_EXIST = 'INSTRUCTOR_ALREADY_EXIST',
  INSTRUCTORS_NOT_FOUND = 'INSTRUCTORS_NOT_FOUND',
  INSTRUCTOR_NOT_FOUND = 'INSTRUCTOR_NOT_FOUND',

  CLASS_ALREADY_EXIST = 'CLASS_ALREADY_EXIST',
  CLASSES_NOT_FOUND = 'CLASSES_NOT_FOUND',
  CLASS_NOT_FOUND = 'CLASS_NOT_FOUND',
  CLASS_NOT_HAS_FREE_SEATS = 'CLASS_NOT_HAS_FREE_SEATS',
  CLASS_CANT_BE_CREATED = 'CLASS_CANT_BE_CREATED',
  CLASS_CANT_BE_CANCELED = 'CLASS_CANT_BE_CANCELED',
  CLASS_HAS_BEEN_CANCELED = 'CLASS_HAS_BEEN_CANCELED',

  ADMIN_ALREADY_EXIST = 'ADMIN_ALREADY_EXIST',
  ADMINS_NOT_FOUND = 'ADMINS_NOT_FOUND',
  ADMIN_NOT_FOUND = 'ADMIN_NOT_FOUND',

  STRIPE_CUSTOMER_ALREADY_EXIST = 'STRIPE_CUSTOMER_ALREADY_EXIST',
  STRIPE_CUSTOMER_NOT_FOUND = 'STRIPE_CUSTOMER_NOT_FOUND',

  STRIPE_PRODUCT_ALREADY_EXIST = 'STRIPE_PRODUCT_ALREADY_EXIST',
  STRIPE_PRODUCT_NOT_FOUND = 'STRIPE_PRODUCT_NOT_FOUND',

  PROMO_CODE_ALREADY_EXIST = 'PROMO_CODE_ALREADY_EXIST',
  PROMO_CODE_NOT_FOUND = 'PROMO_CODE_NOT_FOUND',

  REFUND_IS_NOT_POSSIBLE = 'REFUND_IS_NOT_POSSIBLE',

  TRANSACTION_NOT_FOUND = 'TRANSACTION_NOT_FOUNT',
  TRANSACTIONS_NOT_FOUND = 'TRANSACTIONS_NOT_FOUND',
  TRANSACTION_ALREADY_EXISTS = 'TRANSACTION_ALREADY_EXISTS',
  FAQ_NOT_FOUND = 'FAQ_NOT_FOUND',
  TERMS_AND_CONDITIONS_NOT_FOUND = 'TERMS_AND_CONDITIONS_NOT_FOUND',
  PRIVACY_POLICY_NOT_FOUND = 'PRIVACY_POLICY_NOT_FOUND',

  NOT_ENOUGH_POINTS = 'NOT_ENOUGH_POINTS',

  PAYMENT_EXPIRED = 'PAYMENT_EXPIRED',
  BOOKING_CANT_BE_COMPENSATED = 'BOOKING_CANT_BE_COMPENSATED',
  POINTS_CANT_BE_TRANSFERED = 'POINTS_CANT_BE_TRANSFERED',
  POINTS_CANT_BE_REFUNDED = 'POINTS_CANT_BE_REFUNDED',
}
