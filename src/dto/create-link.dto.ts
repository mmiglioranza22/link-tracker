import { IsNotEmpty } from 'class-validator';

export class CreateLinkDTO {
  @IsNotEmpty()
  target: string;
  password?: string;
  expires?: Date;
}
