import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, ValidateNested, IsNumber, ArrayNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ClientRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}

class ItemRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNumber()
  vatRate: number;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateInvoiceRequestDto {
  @ApiProperty({ type: ClientRequestDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClientRequestDto)
  client: ClientRequestDto;

  @ApiProperty({ type: [ItemRequestDto] })
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemRequestDto)
  items: ItemRequestDto[];
}
