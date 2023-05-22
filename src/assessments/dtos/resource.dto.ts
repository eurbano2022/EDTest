import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResourceDto {
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
    readonly criteriaId: number;
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}
