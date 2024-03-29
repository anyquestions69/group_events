import { IsEmail, IsString, MinLength } from "class-validator"

export class Register {
    @IsEmail()
    email:string
    @IsString()
    @MinLength(8)
    password:string
    @IsString()
    @MinLength(8)
    repass:string
}
