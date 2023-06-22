import { IsNotEmpty, IsString, IsEmail, Length, IsNumber } from "class-validator"

export class SigninDto {

    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
    public password: string
}