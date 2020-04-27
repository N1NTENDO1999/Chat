/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AddChatPictureCommand } from '../models/add-chat-picture-command';
import { ChangeChatCommand } from '../models/change-chat-command';
import { ChatDto } from '../models/chat-dto';
import { CommandChatResult } from '../models/command-chat-result';
import { CommandResult } from '../models/command-result';
import { CreateChatCommand } from '../models/create-chat-command';
import { FindChatsByNameResult } from '../models/find-chats-by-name-result';
import { GetChatByIdQueryResult } from '../models/get-chat-by-id-query-result';
import { GetCountOfUsersInChatQueryResult } from '../models/get-count-of-users-in-chat-query-result';

@Injectable({
  providedIn: 'root',
})
export class ChatsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiChatsChatSearchNameGet
   */
  static readonly ApiChatsChatSearchNameGetPath = '/api/Chats/chat/search/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatSearchNameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatSearchNameGet$Plain$Response(params: {
    name: string;

  }): Observable<StrictHttpResponse<FindChatsByNameResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatSearchNameGetPath, 'get');
    if (params) {

      rb.path('name', params.name);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindChatsByNameResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatSearchNameGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatSearchNameGet$Plain(params: {
    name: string;

  }): Observable<FindChatsByNameResult> {

    return this.apiChatsChatSearchNameGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<FindChatsByNameResult>) => r.body as FindChatsByNameResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatSearchNameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatSearchNameGet$Json$Response(params: {
    name: string;

  }): Observable<StrictHttpResponse<FindChatsByNameResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatSearchNameGetPath, 'get');
    if (params) {

      rb.path('name', params.name);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindChatsByNameResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatSearchNameGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatSearchNameGet$Json(params: {
    name: string;

  }): Observable<FindChatsByNameResult> {

    return this.apiChatsChatSearchNameGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<FindChatsByNameResult>) => r.body as FindChatsByNameResult)
    );
  }

  /**
   * Path part for operation apiChatsChatChatIdUserUserIdGet
   */
  static readonly ApiChatsChatChatIdUserUserIdGetPath = '/api/Chats/chat/{chatId}/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatChatIdUserUserIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdGet$Plain$Response(params: {
    chatId: number;
    userId: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatChatIdUserUserIdGetPath, 'get');
    if (params) {

      rb.path('chatId', params.chatId);
      rb.path('userId', params.userId);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatChatIdUserUserIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdGet$Plain(params: {
    chatId: number;
    userId: number;

  }): Observable<boolean> {

    return this.apiChatsChatChatIdUserUserIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatChatIdUserUserIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdGet$Json$Response(params: {
    chatId: number;
    userId: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatChatIdUserUserIdGetPath, 'get');
    if (params) {

      rb.path('chatId', params.chatId);
      rb.path('userId', params.userId);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatChatIdUserUserIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdGet$Json(params: {
    chatId: number;
    userId: number;

  }): Observable<boolean> {

    return this.apiChatsChatChatIdUserUserIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiChatsChatChatIdUserUserIdPost
   */
  static readonly ApiChatsChatChatIdUserUserIdPostPath = '/api/Chats/chat/{chatId}/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatChatIdUserUserIdPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdPost$Plain$Response(params: {
    chatId: number;
    userId: number;

  }): Observable<StrictHttpResponse<ChatDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatChatIdUserUserIdPostPath, 'post');
    if (params) {

      rb.path('chatId', params.chatId);
      rb.path('userId', params.userId);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChatDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatChatIdUserUserIdPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdPost$Plain(params: {
    chatId: number;
    userId: number;

  }): Observable<ChatDto> {

    return this.apiChatsChatChatIdUserUserIdPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<ChatDto>) => r.body as ChatDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatChatIdUserUserIdPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdPost$Json$Response(params: {
    chatId: number;
    userId: number;

  }): Observable<StrictHttpResponse<ChatDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatChatIdUserUserIdPostPath, 'post');
    if (params) {

      rb.path('chatId', params.chatId);
      rb.path('userId', params.userId);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChatDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatChatIdUserUserIdPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatChatIdUserUserIdPost$Json(params: {
    chatId: number;
    userId: number;

  }): Observable<ChatDto> {

    return this.apiChatsChatChatIdUserUserIdPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<ChatDto>) => r.body as ChatDto)
    );
  }

  /**
   * Path part for operation apiChatsGet
   */
  static readonly ApiChatsGetPath = '/api/Chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsGet$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<FindChatsByNameResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindChatsByNameResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsGet$Plain(params?: {

  }): Observable<FindChatsByNameResult> {

    return this.apiChatsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<FindChatsByNameResult>) => r.body as FindChatsByNameResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsGet$Json$Response(params?: {

  }): Observable<StrictHttpResponse<FindChatsByNameResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindChatsByNameResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsGet$Json(params?: {

  }): Observable<FindChatsByNameResult> {

    return this.apiChatsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<FindChatsByNameResult>) => r.body as FindChatsByNameResult)
    );
  }

  /**
   * Path part for operation apiChatsPut
   */
  static readonly ApiChatsPutPath = '/api/Chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPut$Plain$Response(params?: {
      body?: ChangeChatCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsPutPath, 'put');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPut$Plain(params?: {
      body?: ChangeChatCommand
  }): Observable<CommandResult> {

    return this.apiChatsPut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPut$Json$Response(params?: {
      body?: ChangeChatCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsPutPath, 'put');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPut$Json(params?: {
      body?: ChangeChatCommand
  }): Observable<CommandResult> {

    return this.apiChatsPut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiChatsPost
   */
  static readonly ApiChatsPostPath = '/api/Chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPost$Plain$Response(params?: {
      body?: CreateChatCommand
  }): Observable<StrictHttpResponse<CommandChatResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandChatResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPost$Plain(params?: {
      body?: CreateChatCommand
  }): Observable<CommandChatResult> {

    return this.apiChatsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandChatResult>) => r.body as CommandChatResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPost$Json$Response(params?: {
      body?: CreateChatCommand
  }): Observable<StrictHttpResponse<CommandChatResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandChatResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsPost$Json(params?: {
      body?: CreateChatCommand
  }): Observable<CommandChatResult> {

    return this.apiChatsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandChatResult>) => r.body as CommandChatResult)
    );
  }

  /**
   * Path part for operation apiChatsChatIdGet
   */
  static readonly ApiChatsChatIdGetPath = '/api/Chats/chat/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdGet$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetChatByIdQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetChatByIdQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdGet$Plain(params: {
    id: number;

  }): Observable<GetChatByIdQueryResult> {

    return this.apiChatsChatIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetChatByIdQueryResult>) => r.body as GetChatByIdQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdGet$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetChatByIdQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetChatByIdQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdGet$Json(params: {
    id: number;

  }): Observable<GetChatByIdQueryResult> {

    return this.apiChatsChatIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetChatByIdQueryResult>) => r.body as GetChatByIdQueryResult)
    );
  }

  /**
   * Path part for operation apiChatsChatIdUserCountGet
   */
  static readonly ApiChatsChatIdUserCountGetPath = '/api/Chats/chat/{id}/user/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatIdUserCountGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdUserCountGet$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetCountOfUsersInChatQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatIdUserCountGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetCountOfUsersInChatQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatIdUserCountGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdUserCountGet$Plain(params: {
    id: number;

  }): Observable<GetCountOfUsersInChatQueryResult> {

    return this.apiChatsChatIdUserCountGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetCountOfUsersInChatQueryResult>) => r.body as GetCountOfUsersInChatQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatIdUserCountGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdUserCountGet$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetCountOfUsersInChatQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatIdUserCountGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetCountOfUsersInChatQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsChatIdUserCountGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatIdUserCountGet$Json(params: {
    id: number;

  }): Observable<GetCountOfUsersInChatQueryResult> {

    return this.apiChatsChatIdUserCountGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetCountOfUsersInChatQueryResult>) => r.body as GetCountOfUsersInChatQueryResult)
    );
  }

  /**
   * Path part for operation apiChatsAdminUserUserIdPost
   */
  static readonly ApiChatsAdminUserUserIdPostPath = '/api/Chats/admin/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsAdminUserUserIdPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsAdminUserUserIdPost$Plain$Response(params: {
    userId: number;

  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsAdminUserUserIdPostPath, 'post');
    if (params) {

      rb.path('userId', params.userId);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsAdminUserUserIdPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsAdminUserUserIdPost$Plain(params: {
    userId: number;

  }): Observable<CommandResult> {

    return this.apiChatsAdminUserUserIdPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsAdminUserUserIdPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsAdminUserUserIdPost$Json$Response(params: {
    userId: number;

  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsAdminUserUserIdPostPath, 'post');
    if (params) {

      rb.path('userId', params.userId);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsAdminUserUserIdPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsAdminUserUserIdPost$Json(params: {
    userId: number;

  }): Observable<CommandResult> {

    return this.apiChatsAdminUserUserIdPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiChatsIdPicturePut
   */
  static readonly ApiChatsIdPicturePutPath = '/api/Chats/{id}/picture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsIdPicturePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsIdPicturePut$Plain$Response(params: {
    id: number;
      body?: AddChatPictureCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsIdPicturePutPath, 'put');
    if (params) {

      rb.path('id', params.id);

      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsIdPicturePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsIdPicturePut$Plain(params: {
    id: number;
      body?: AddChatPictureCommand
  }): Observable<CommandResult> {

    return this.apiChatsIdPicturePut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsIdPicturePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsIdPicturePut$Json$Response(params: {
    id: number;
      body?: AddChatPictureCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsIdPicturePutPath, 'put');
    if (params) {

      rb.path('id', params.id);

      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiChatsIdPicturePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatsIdPicturePut$Json(params: {
    id: number;
      body?: AddChatPictureCommand
  }): Observable<CommandResult> {

    return this.apiChatsIdPicturePut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

}
