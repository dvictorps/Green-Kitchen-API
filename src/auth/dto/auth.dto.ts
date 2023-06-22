import { IsNotEmpty, IsString, IsEmail, Length, IsNumber } from "class-validator";

export class AuthDto {
    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    public name: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
    public password: string


    @IsNotEmpty()
    @IsNumber()
    public roleId: number


    @IsNotEmpty()
    @IsNumber()
    public userStatusId: number
}