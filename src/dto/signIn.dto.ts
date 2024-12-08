import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignInDto{
    @IsEmail()
    @ApiProperty({ description: 'The email of the user' })
    readonly email: string;
    @ApiProperty({ description: 'The password of the user' })
    readonly password: string;
}