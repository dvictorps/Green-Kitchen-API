import { SetMetadata } from '@nestjs/common';

export enum Role {
    Admin = 1,
    Protected = 2,
    Public = 3
}

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
