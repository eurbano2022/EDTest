import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProcessAreaDto {
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
    readonly levelId: number;
}

export class UpdateProcessAreaDto extends PartialType(CreateProcessAreaDto) {}
