import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateGoalDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly type: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    readonly criteriaIds: number[];
}

export class UpdateGoalDto extends PartialType(CreateGoalDto) {}
