import { PartialType } from "@nestjs/swagger";
import { CreateHouseDto } from "./createHouse.dto";

export class UpdateHouseDto extends PartialType(CreateHouseDto){}