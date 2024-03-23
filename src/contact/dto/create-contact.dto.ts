import { JsonArray } from "@prisma/client/runtime/library";
import { IsDateString, IsString, isString } from "class-validator";

export class CreateContactDto {
    firstname: string;
    lastname: string;
    @IsDateString()
    birth:Date;
    email:string;
    whatsapp:string;
    country:string;
    city:string;
    telegram:string;
    tags:[number]
}
