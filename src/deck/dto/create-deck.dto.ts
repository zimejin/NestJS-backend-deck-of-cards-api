import { IsNotEmpty, IsUppercase } from "class-validator";

export class CreateDeckDto {
    @IsNotEmpty()
    @IsUppercase()
    "type": string;

    @IsNotEmpty()
    "shuffled": boolean | string;
}