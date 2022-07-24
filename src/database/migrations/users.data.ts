import { RolesEnum, StatusEnum, UserEntity } from 'src/modules/users/entities';

export const users: Partial<UserEntity>[] = [
  {
    id: '067f2f3e-b936-4029-93d6-b2f58ae4f489',
    ppid: '3fyp8PSzNKX1/d8Wv43eV1qybL+02m/Bb4NyH9SfUAI=',
    status: StatusEnum.ACTIVATED,
    role: RolesEnum.ADMIN,
    firstName: 'Oleg',
    lastName: 'Neon',
    username: '#23RF@!SDV',
    password: '$2b$08$XpX3up0mK.LbJUMoH2S6lOeKdBQiuNzN52EAwVqQhVICKnYDrhqzy',
    phoneNumber: '+996777320693',
    telegram: '@cotcelebro',
  },
];
