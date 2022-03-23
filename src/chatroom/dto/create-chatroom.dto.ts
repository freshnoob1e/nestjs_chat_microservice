import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsString()
  @IsNotEmpty()
  uid_main: string;

  @IsString()
  @IsNotEmpty()
  name_main: string;

  @IsString()
  @IsNotEmpty()
  uid_target: string;

  @IsString()
  @IsNotEmpty()
  name_target: string;
}
