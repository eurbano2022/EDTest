import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: `product's name` })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
