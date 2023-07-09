import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePracticeDto {
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

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly processAreaId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly goalId: number;
}

export class UpdateGoalDto extends PartialType(CreatePracticeDto) {}
