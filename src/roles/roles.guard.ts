import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles: Role[] = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();

        const user = request.user as { id: number, user: string, role: number }

        if (roles.includes(Role.Protected)) {
            return user.role === Role.Admin ? true : user.id === parseInt(request.params.id);
        }

        if (roles.includes(Role.Admin)) {
            return user.role === Role.Admin ? true : false;
        }

        return true;
    }
}