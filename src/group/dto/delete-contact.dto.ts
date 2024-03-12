import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
class IdsList{
    id:number
}
export class DeleteContacts extends PartialType(CreateGroupDto) {   
    users:[IdsList]
}
