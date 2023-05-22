import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCriteriaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly processAreaId: number;
}

export class UpdateCriteriaDto extends PartialType(CreateCriteriaDto) {}
