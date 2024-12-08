import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PasswordHelper } from "src/helpers";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema,}])],
    controllers: [UserController],
    providers:[UserService,PasswordHelper],
})
export class UserModule{}