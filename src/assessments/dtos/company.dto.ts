import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly size: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly industry: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
