import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HouseDocument = HydratedDocument<House>;
@Schema()
export class House {
    @Prop()
    email: string;
    @Prop({required:true})
    price: number;
    @Prop({required:true})
    female: boolean;
    @Prop({ required: true })
    images: string[];
    @Prop({ required: true })
    male: boolean;
    @Prop({required:true})
    furniture: boolean;
    @Prop({required:true})
    roomsNumber: number;
    @Prop({required:true})
    city: string;
}
export const HouseSchema = SchemaFactory.createForClass(House);