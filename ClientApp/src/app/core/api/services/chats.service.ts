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
import { CommandResult } from '../models/command-result';
import { CreateChatCommand } from '../models/create-chat-command';
import { FindChatsByNameResult } from '../models/find-chats-by-name-result';
import { GetChatByIdQueryResult } from '../models/get-chat-by-id-query-result';

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
   * Path part for operation apiChatsChatNameGet
   */
  static readonly ApiChatsChatNameGetPath = '/api/Chats/chat/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatNameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatNameGet$Plain$Response(params: {
    name: string;

  }): Observable<StrictHttpResponse<FindChatsByNameResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatNameGetPath, 'get');
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
   * To access the full response (for headers, for example), `apiChatsChatNameGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatNameGet$Plain(params: {
    name: string;

  }): Observable<FindChatsByNameResult> {

    return this.apiChatsChatNameGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<FindChatsByNameResult>) => r.body as FindChatsByNameResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsChatNameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatNameGet$Json$Response(params: {
    name: string;

  }): Observable<StrictHttpResponse<FindChatsByNameResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsChatNameGetPath, 'get');
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
   * To access the full response (for headers, for example), `apiChatsChatNameGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsChatNameGet$Json(params: {
    name: string;

  }): Observable<FindChatsByNameResult> {

    return this.apiChatsChatNameGet$Json$Response(params).pipe(
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

  }): Observable<StrictHttpResponse<CommandResult>> {

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
        return r as StrictHttpResponse<CommandResult>;
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

  }): Observable<CommandResult> {

    return this.apiChatsChatChatIdUserUserIdPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
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

  }): Observable<StrictHttpResponse<CommandResult>> {

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
        return r as StrictHttpResponse<CommandResult>;
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

  }): Observable<CommandResult> {

    return this.apiChatsChatChatIdUserUserIdPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
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
  }): Observable<StrictHttpResponse<CommandResult>> {

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
        return r as StrictHttpResponse<CommandResult>;
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
  }): Observable<CommandResult> {

    return this.apiChatsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
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
  }): Observable<StrictHttpResponse<CommandResult>> {

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
        return r as StrictHttpResponse<CommandResult>;
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
  }): Observable<CommandResult> {

    return this.apiChatsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiChatsIdGet
   */
  static readonly ApiChatsIdGetPath = '/api/Chats/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsIdGet$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetChatByIdQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsIdGetPath, 'get');
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
   * To access the full response (for headers, for example), `apiChatsIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsIdGet$Plain(params: {
    id: number;

  }): Observable<GetChatByIdQueryResult> {

    return this.apiChatsIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetChatByIdQueryResult>) => r.body as GetChatByIdQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatsIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsIdGet$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetChatByIdQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, ChatsService.ApiChatsIdGetPath, 'get');
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
   * To access the full response (for headers, for example), `apiChatsIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatsIdGet$Json(params: {
    id: number;

  }): Observable<GetChatByIdQueryResult> {

    return this.apiChatsIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetChatByIdQueryResult>) => r.body as GetChatByIdQueryResult)
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
