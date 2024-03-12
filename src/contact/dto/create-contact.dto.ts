export class CreateContactDto {
    name: string;
    firstname: string;
    lastname: string;
    birth:Date;
    country:string;
    city:string;
    tags:[{id:number}]
}
