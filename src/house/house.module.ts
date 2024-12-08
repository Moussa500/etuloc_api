import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema, User, UserSchema } from 'src/models';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),MulterModule.register({dest: './uploads/houses',})],
  providers: [HouseService],
  controllers: [HouseController]
})
export class HouseModule {}
