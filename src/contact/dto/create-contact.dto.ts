import { JsonArray } from "@prisma/client/runtime/library";

export class CreateContactDto {
    name: string;
    firstname: string;
    lastname: string;
    birth:Date;
    country:string;
    city:string;
    link:string;
    tags:[number]
}
