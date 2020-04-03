/* tslint:disable */
import { UserDto } from './user-dto';
export interface SearchedPersonalMessageDto {
  Chat?: null | UserDto;
  DateCreated?: string;
  Id?: number;
  Text?: null | string;
}
