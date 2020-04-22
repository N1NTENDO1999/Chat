/* tslint:disable */
import { ChatProfileDto } from './chat-profile-dto';
export interface ChatMessageDto {
  Chat?: null | ChatProfileDto;
  ChatId?: number;
  DateCreated?: string;
  Id?: number;
  Text?: null | string;
}
