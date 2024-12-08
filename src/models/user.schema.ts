import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User{
    @Prop()
    id: string;
    @Prop({required:true,unique:true})
    email: string;
    @Prop({required:true})
    password: string;
    @Prop({required:true})
    name: string;
    @Prop({required:true})
    phoneNumber: string
    @Prop({required:true})
    student: boolean;
    @Prop()
    numberOfRaters: number;
    @Prop()
    sumOfRatings: number;
    @Prop()
    city: string;
    @Prop()
    postedHouses: string[];
    @Prop()
    numberRentedHouses: number;
    @Prop()
    numberPostedHouses: number;
    @Prop()
    university: string;
}
export const UserSchema = SchemaFactory.createForClass(User);