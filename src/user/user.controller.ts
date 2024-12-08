import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "src/dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("student")
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Add a new student',
        description: 'Creates a new student user in the system.',
    })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Student successfully added.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    async addStudent(@Body() createUserDto: CreateUserDto) {
        try {
            const data = await this.userService.createStudent(createUserDto);
            return {
                success: true,
                data,
                message: "Student added successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Post("Owner")
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Add a new owner',
        description: 'Creates a new owner user in the system.',
    })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Owner successfully added.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    async addOwner(@Body() createUserDto: CreateUserDto) {
        try {
            const data = await this.userService.createOwner(createUserDto);
            return {
                success: true,
                data,
                message: "Owner added successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get all users',
        description: 'Fetches all users (students and owners) in the system.',
    })
    @ApiResponse({
        status: 200,
        description: 'Users fetched successfully.',
        schema: {
            example: [
                {
                    email: 'owner@example.com',
                    name: 'John Doe',
                    student: false,
                    university: 'N/A',
                    sumOfRatings: 10,
                    city: 'New York',
                    postedHouses: ['House 1', 'House 2'],
                    numberRentedHouses: 2,
                },
                {
                    email: 'student@example.com',
                    name: 'Jane Doe',
                    student: true,
                    university: 'University XYZ',
                    sumOfRatings: 5,
                    city: 'Los Angeles',
                    postedHouses: [],
                    numberRentedHouses: 0,
                }
            ]
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    async findAll() {
        try {
            const data = await this.userService.findAll();
            return {
                success: true,
                data,
                message: "Users fetched successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get user by ID',
        description: 'Fetch a specific user by their ID.',
    })
    @ApiResponse({
        status: 200,
        description: 'User fetched successfully.',
        schema: {
            example: {
                email: 'student@example.com',
                name: 'Jane Doe',
                student: true,
                university: 'University XYZ',
                sumOfRatings: 5,
                city: 'Los Angeles',
                postedHouses: [],
                numberRentedHouses: 0,
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'User not found.',
    })
    async findOne(@Param('id') id: string) {
        try {
            const data = await this.userService.findOne(id);
            return {
                success: true,
                data,
                message: "User fetched successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.NOT_FOUND,
            };
        }
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Update user details',
        description: 'Update the details of an existing user (student or owner).',
    })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: 200,
        description: 'User updated successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request, invalid data or user ID.',
    })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            await this.userService.update(id, updateUserDto);
            return {
                success: true,
                message: "User updated successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete user by ID',
        description: 'Deletes a user (student or owner) by their ID.',
    })
    @ApiResponse({
        status: 200,
        description: 'User deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found.',
    })
    async delete(@Param('id') id: string) {
        try {
            await this.userService.delete(id);
            return {
                success: true,
                message: "User deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.NOT_FOUND,
            };
        }
    }

    @Get('student')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get all students',
        description: 'Fetch all students from the system.',
    })
    @ApiResponse({
        status: 200,
        description: 'Students fetched successfully.',
        schema: {
            example: [
                {
                    email: 'student1@example.com',
                    name: 'Alice',
                    student: true,
                    university: 'University A',
                    sumOfRatings: 3,
                    city: 'Chicago',
                    postedHouses: [],
                    numberRentedHouses: 0,
                },
                {
                    email: 'student2@example.com',
                    name: 'Bob',
                    student: true,
                    university: 'University B',
                    sumOfRatings: 8,
                    city: 'San Francisco',
                    postedHouses: ['House A'],
                    numberRentedHouses: 1,
                }
            ]
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    async fetchAllStudent() {
        try {
            const data = await this.userService.fetchAllStudents();
            return {
                success: true,
                data,
                message: "Students fetched successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}
