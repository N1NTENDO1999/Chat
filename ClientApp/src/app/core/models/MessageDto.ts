import { UserDto } from '../api/models';

export class MessageDto{
    Id: number;
	DateCreated: Date;
	Text: string;
	IsRead: boolean; 

	SenderId: number;
	Sender: UserDto;
}