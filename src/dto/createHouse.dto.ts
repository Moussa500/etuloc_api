import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateHouseDto {
    @IsEmail()
    @ApiProperty({ description: 'The email address of the house owner' })
    email: string;
    @ApiProperty({ description: 'The price of the house per month' })
    readonly price: number;
    @ApiProperty({ description: 'The images of the house' })
    images: string[];
    @ApiProperty({ description: 'The gender for which the house is intended (female or male)' })
    readonly gender: string;
    @ApiProperty({ description: 'Indicates whether the house is furnished (true if furnished, false if not)' })
    readonly furniture: boolean;
    @ApiProperty({ description: 'The number of rooms in the house' })
    readonly roomsNumber: number;

    @ApiProperty({ description: 'The city where the house is located' })
    readonly city: string;
}
