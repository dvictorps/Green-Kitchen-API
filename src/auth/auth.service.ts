import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt/dist'
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express'


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async signup(dto: AuthDto) {
        const { email, password, name, roleId, userStatusId } = dto

        const hashedPassword = await this.hashPassword(password);

        const [foundUser, checkRole, checkStatus] = await Promise.all([
            this.prisma.user.findUnique({ where: { email } }),
            this.prisma.role.findUnique({ where: { idRole: roleId } }),
            this.prisma.userStatus.findUnique({ where: { id: userStatusId } })
        ])


        await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: { connect: { idRole: roleId } },
                UserStatus: { connect: { id: userStatusId } }
            }
        })

        if (foundUser) {
            throw new BadRequestException('Email já existe')
        }

        if (!checkRole || !checkStatus) throw new BadRequestException('Cargo/Estado inexistente')

        return { message: 'Cadastrado com sucesso' }
    }

    async signin(dto: SigninDto, req: Response, res: Response) {

        const { email, password } = dto;

        const foundUser = await this.prisma.user.findUnique({ where: { email } });

        console.log(foundUser)

        if (!foundUser) {
            throw new BadRequestException('Credenciais incorretas');
        }

        const isMatch = await this.comparePassword({ password, hash: foundUser.password });

        if (!isMatch) {
            throw new BadRequestException('Credenciais incorretas');
        }

        //JWT token

        const token = await this.signToken({
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.roleId
        })


        if (!token) {
            throw new ForbiddenException()
        }

        res.cookie('token', token)

        const data = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password,
            roleId: foundUser.roleId,
            userStatusId: foundUser.userStatusId,
            token:token
        }

        return res.send(data)
    }

    async signout(req: Request, res: Response) {

        res.clearCookie('token');

        return res.send({ message: "Deslogado com sucesso" });
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);

    }

    async comparePassword(args: { password: string, hash: string }) {
        return await bcrypt.compare(args.password, args.hash)
    }

    async signToken(args: { id: number, email: string, role: number }) {
        const payload = args


        return this.jwt.signAsync(payload, { secret: jwtSecret })
    }
}
