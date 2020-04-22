/* tslint:disable */
import { UserDto } from './user-dto';
export interface SearchedPersonalMessageDto {
  Chat?: null | UserDto;
  ChatId?: number;
  DateCreated?: string;
  Id?: number;
  Text?: null | string;
}
