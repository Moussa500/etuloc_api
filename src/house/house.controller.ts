import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateHouseDto, UpdateHouseDto } from 'src/dto';
import { HouseService } from './house.service';
import { Public } from 'src/isPublic';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('house')
@Controller('house')
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new house' }) 
  @ApiBody({ type: CreateHouseDto }) 
  @ApiResponse({
    status: 201,
    description: 'House created successfully.',
    type: CreateHouseDto, 
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UseInterceptors(FilesInterceptor('images', 4)) 
  async postHouse(
    @Body() createHouseDto: CreateHouseDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const imagePaths = files.map((file) => file.path);
      const houseDtoWithImages = { ...createHouseDto, images: imagePaths };
      const data = await this.houseService.createHouse(houseDtoWithImages);
      return {
        success: true,
        data,
        message: 'House created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific house by ID' })
  @ApiResponse({
    status: 200,
    description: 'House fetched successfully.',
    type: CreateHouseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'House not found',
  })
  async getHouse(@Param('id') id: string) {
    try {
      const data = await this.houseService.findOne(id);
      return {
        success: true,
        data,
        message: 'House fetched successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all houses' })
  @ApiResponse({
    status: 200,
    description: 'Houses fetched successfully.',
    type: [CreateHouseDto], 
  })
  async getAllHouses() {
    try {
      const data = await this.houseService.findAll();
      return {
        success: true,
        data,
        message: 'Houses fetched successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Public()
  @Get('renter/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get houses for a specific renter by email' })
  @ApiResponse({
    status: 200,
    description: 'Houses loaded successfully.',
    type: [CreateHouseDto],
  })
  async getHousesPerRenter(@Param('email') email: string) {
    try {
      const data = await this.houseService.fetchHousesPerRenter(email);
      return {
        success: true,
        data,
        message: 'Houses loaded successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Public()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing house' })
  @ApiBody({ type: UpdateHouseDto })
  @ApiResponse({
    status: 200,
    description: 'House updated successfully.',
    type: UpdateHouseDto, 
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseInterceptors(FilesInterceptor('images', 10)) 
  async updateHouse(
    @Param('id') id: string,
    @Body() updateHouseDto: UpdateHouseDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    try {
      if (files && files.length > 0) {
        const imagePaths = files.map((file) => file.path);
        updateHouseDto.images = imagePaths;
      }

      const data = await this.houseService.update(id, updateHouseDto);
      return {
        success: true,
        data,
        message: 'House updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
