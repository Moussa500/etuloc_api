import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumberString, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({ description: 'The full name of the user' })
    readonly name: string;
    @IsEmail()
    @ApiProperty({ description: 'The email address of the user' })
    readonly email: string;
    @IsStrongPassword()
    @ApiProperty({ description: 'The password of the user, must be strong' })
    readonly password: string;
    @IsNumberString()
    @ApiProperty({ description: 'The phone number of the user' })
    readonly phoneNumber: string;
    @IsBoolean()
    @ApiProperty({ description: 'Indicates if the user is a student or an owner' })
    readonly student: boolean;
    @ApiProperty({ description: 'The university the user attends, applicable if the user is a student' })
    readonly university: string;
    @ApiProperty({ description: 'Total sum of ratings given to the owner by students' })
     sumOfRatings: number;
     @ApiProperty({ description: 'the number of the students that rated a specific owner' })
     numberOfRaters: number;
    @ApiProperty({ description: 'The city where the user resides or operates' })
    readonly city: string;
    @ApiProperty({ description: 'The rate of an owner ' })
    readonly rating: string;
    @ApiProperty({ description: 'List of houses posted by the user (if the user is an owner)' })
     postedHouses: string[];
    @ApiProperty({ description: 'The number of houses rented by the user (if the user is an owner)' })
     numberRentedHouses: number;
}
