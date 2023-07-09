import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly result: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly criteriaId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly companyId: number;
}

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
