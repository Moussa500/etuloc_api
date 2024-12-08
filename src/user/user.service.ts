import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto, UpdateUserDto } from "src/dto";
import { PasswordHelper } from "src/helpers";
import { User } from "src/models";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, @Inject(PasswordHelper) private passwordHelper: PasswordHelper) { }
    async createStudent(createUserDto: CreateUserDto): Promise<User> {
        const createdStudent = new this.userModel(createUserDto);
        createdStudent.password = await this.passwordHelper.hashPassword(createdStudent.password);
        return createdStudent.save();
    }
    async createOwner(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.postedHouses = [];
        createUserDto.sumOfRatings = 0;
        createUserDto.numberRentedHouses = 0;
        createUserDto.numberOfRaters = 0;
        const createdOwner = new this.userModel(createUserDto);
        createdOwner.password = await this.passwordHelper.hashPassword(createdOwner.password);
        return createdOwner.save();
    }
    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id);
    }
    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }
    async delete(id: string): Promise<void> {
        return await this.userModel.findByIdAndDelete(id);
    }
    async fetchAllStudents(): Promise<User[]> {
        return await this.userModel.find({ student: true }).exec();
    }
    async fetchAllOwners(): Promise<User[]> {
        return await this.userModel.find({ Owner: true }).exec();
    }
}