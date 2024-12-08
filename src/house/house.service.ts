import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHouseDto, UpdateHouseDto } from 'src/dto';
import { House, HouseDocument } from 'src/models';

@Injectable()
export class HouseService {
    constructor(@InjectModel(House.name) private houseModel: Model<House>) {}
    async createHouse(createHouseDto: CreateHouseDto): Promise<House> {
        const createdHouse = new this.houseModel(createHouseDto);
        return createdHouse.save();
    }
    async fetchHousesPerRenter(email:string): Promise<House[]>{
        return this.houseModel.find({ email }).exec();
    }
    async findAll(): Promise<House[]>{
        return this.houseModel.find().exec();
    }
    async update(id:string,updateHouseDto:UpdateHouseDto): Promise<House>{
        return this.houseModel.findByIdAndUpdate(id);
    }
    async findOne(id: string): Promise<House>{
        return this.houseModel.findById(id);
    }
    async delete(id: string): Promise<void>{
        return this.houseModel.findByIdAndDelete(id);
    }
    async fetchAllHouses(): Promise<House[]>{
        return this.houseModel.find().exec();
    }
}
