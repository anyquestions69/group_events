class Contact{
    id:number
}

export class CreateGroupDto {
    name:string;
    contacts:[Contact]
    tags:[{name:string}]
}
