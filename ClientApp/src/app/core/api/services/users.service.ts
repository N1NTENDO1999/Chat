/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CommandResult } from '../models/command-result';
import { CreateUserCommand } from '../models/create-user-command';
import { EditUserProfileCommand } from '../models/edit-user-profile-command';
import { GetUserChatsQueryResult } from '../models/get-user-chats-query-result';
import { GetUserQueryResult } from '../models/get-user-query-result';
import { GetUsersByNicknameQueryResult } from '../models/get-users-by-nickname-query-result';
import { ProfileInfoDto } from '../models/profile-info-dto';
import { SearchMessagesQueryResult } from '../models/search-messages-query-result';
import { SearchPersonalMessagesByTermQueryResult } from '../models/search-personal-messages-by-term-query-result';
import { UpdatePasswordCommand } from '../models/update-password-command';
import { UpdateProfileInfoCommand } from '../models/update-profile-info-command';
import { UpdateUserPictureCommand } from '../models/update-user-picture-command';
import { UsersQueryResult } from '../models/users-query-result';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiUsersGet
   */
  static readonly ApiUsersGetPath = '/api/Users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersGet$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<UsersQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersGet$Plain(params?: {

  }): Observable<UsersQueryResult> {

    return this.apiUsersGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UsersQueryResult>) => r.body as UsersQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersGet$Json$Response(params?: {

  }): Observable<StrictHttpResponse<UsersQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersGet$Json(params?: {

  }): Observable<UsersQueryResult> {

    return this.apiUsersGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UsersQueryResult>) => r.body as UsersQueryResult)
    );
  }

  /**
   * Path part for operation apiUsersPost
   */
  static readonly ApiUsersPostPath = '/api/Users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersPost$Plain$Response(params?: {
      body?: CreateUserCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiUsersPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersPost$Plain(params?: {
      body?: CreateUserCommand
  }): Observable<CommandResult> {

    return this.apiUsersPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersPost$Json$Response(params?: {
      body?: CreateUserCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiUsersPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersPost$Json(params?: {
      body?: CreateUserCommand
  }): Observable<CommandResult> {

    return this.apiUsersPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdGet
   */
  static readonly ApiUsersUserIdGetPath = '/api/Users/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdGet$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetUserQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetUserQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdGet$Plain(params: {
    id: number;

  }): Observable<GetUserQueryResult> {

    return this.apiUsersUserIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetUserQueryResult>) => r.body as GetUserQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdGet$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetUserQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetUserQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdGet$Json(params: {
    id: number;

  }): Observable<GetUserQueryResult> {

    return this.apiUsersUserIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetUserQueryResult>) => r.body as GetUserQueryResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdPut
   */
  static readonly ApiUsersUserIdPutPath = '/api/Users/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPut$Plain$Response(params: {
    id: string;
      body?: EditUserProfileCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPut$Plain(params: {
    id: string;
      body?: EditUserProfileCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdPut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPut$Json$Response(params: {
    id: string;
      body?: EditUserProfileCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPut$Json(params: {
    id: string;
      body?: EditUserProfileCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdPut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiUsersNicknameGet
   */
  static readonly ApiUsersNicknameGetPath = '/api/Users/{nickname}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersNicknameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNicknameGet$Plain$Response(params: {
    nickname: string;

  }): Observable<StrictHttpResponse<GetUsersByNicknameQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersNicknameGetPath, 'get');
    if (params) {

      rb.path('nickname', params.nickname);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetUsersByNicknameQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersNicknameGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNicknameGet$Plain(params: {
    nickname: string;

  }): Observable<GetUsersByNicknameQueryResult> {

    return this.apiUsersNicknameGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetUsersByNicknameQueryResult>) => r.body as GetUsersByNicknameQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersNicknameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNicknameGet$Json$Response(params: {
    nickname: string;

  }): Observable<StrictHttpResponse<GetUsersByNicknameQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersNicknameGetPath, 'get');
    if (params) {

      rb.path('nickname', params.nickname);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetUsersByNicknameQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersNicknameGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNicknameGet$Json(params: {
    nickname: string;

  }): Observable<GetUsersByNicknameQueryResult> {

    return this.apiUsersNicknameGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetUsersByNicknameQueryResult>) => r.body as GetUsersByNicknameQueryResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdChatsGet
   */
  static readonly ApiUsersUserIdChatsGetPath = '/api/Users/user/{id}/chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdChatsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdChatsGet$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetUserChatsQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdChatsGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetUserChatsQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdChatsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdChatsGet$Plain(params: {
    id: number;

  }): Observable<GetUserChatsQueryResult> {

    return this.apiUsersUserIdChatsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetUserChatsQueryResult>) => r.body as GetUserChatsQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdChatsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdChatsGet$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<GetUserChatsQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdChatsGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetUserChatsQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdChatsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdChatsGet$Json(params: {
    id: number;

  }): Observable<GetUserChatsQueryResult> {

    return this.apiUsersUserIdChatsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetUserChatsQueryResult>) => r.body as GetUserChatsQueryResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdProfileGet
   */
  static readonly ApiUsersUserIdProfileGetPath = '/api/Users/user/{id}/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdProfileGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdProfileGet$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ProfileInfoDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdProfileGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProfileInfoDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdProfileGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdProfileGet$Plain(params: {
    id: number;

  }): Observable<ProfileInfoDto> {

    return this.apiUsersUserIdProfileGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<ProfileInfoDto>) => r.body as ProfileInfoDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdProfileGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdProfileGet$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ProfileInfoDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdProfileGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProfileInfoDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdProfileGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdProfileGet$Json(params: {
    id: number;

  }): Observable<ProfileInfoDto> {

    return this.apiUsersUserIdProfileGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<ProfileInfoDto>) => r.body as ProfileInfoDto)
    );
  }

  /**
   * Path part for operation apiUsersUserIdProfilePut
   */
  static readonly ApiUsersUserIdProfilePutPath = '/api/Users/user/{id}/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdProfilePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdProfilePut$Plain$Response(params: {
    id: string;
      body?: UpdateProfileInfoCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdProfilePutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdProfilePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdProfilePut$Plain(params: {
    id: string;
      body?: UpdateProfileInfoCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdProfilePut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdProfilePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdProfilePut$Json$Response(params: {
    id: string;
      body?: UpdateProfileInfoCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdProfilePutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdProfilePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdProfilePut$Json(params: {
    id: string;
      body?: UpdateProfileInfoCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdProfilePut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdMessagesChatTermGet
   */
  static readonly ApiUsersUserIdMessagesChatTermGetPath = '/api/Users/user/{id}/messages/chat/{term}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdMessagesChatTermGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagesChatTermGet$Plain$Response(params: {
    id: number;
    term: string;

  }): Observable<StrictHttpResponse<SearchMessagesQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdMessagesChatTermGetPath, 'get');
    if (params) {

      rb.path('id', params.id);
      rb.path('term', params.term);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SearchMessagesQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdMessagesChatTermGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagesChatTermGet$Plain(params: {
    id: number;
    term: string;

  }): Observable<SearchMessagesQueryResult> {

    return this.apiUsersUserIdMessagesChatTermGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SearchMessagesQueryResult>) => r.body as SearchMessagesQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdMessagesChatTermGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagesChatTermGet$Json$Response(params: {
    id: number;
    term: string;

  }): Observable<StrictHttpResponse<SearchMessagesQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdMessagesChatTermGetPath, 'get');
    if (params) {

      rb.path('id', params.id);
      rb.path('term', params.term);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SearchMessagesQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdMessagesChatTermGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagesChatTermGet$Json(params: {
    id: number;
    term: string;

  }): Observable<SearchMessagesQueryResult> {

    return this.apiUsersUserIdMessagesChatTermGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SearchMessagesQueryResult>) => r.body as SearchMessagesQueryResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdMessagePrivateTermGet
   */
  static readonly ApiUsersUserIdMessagePrivateTermGetPath = '/api/Users/user/{id}/message/private/{term}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdMessagePrivateTermGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagePrivateTermGet$Plain$Response(params: {
    id: number;
    term: string;

  }): Observable<StrictHttpResponse<SearchPersonalMessagesByTermQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdMessagePrivateTermGetPath, 'get');
    if (params) {

      rb.path('id', params.id);
      rb.path('term', params.term);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SearchPersonalMessagesByTermQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdMessagePrivateTermGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagePrivateTermGet$Plain(params: {
    id: number;
    term: string;

  }): Observable<SearchPersonalMessagesByTermQueryResult> {

    return this.apiUsersUserIdMessagePrivateTermGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SearchPersonalMessagesByTermQueryResult>) => r.body as SearchPersonalMessagesByTermQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdMessagePrivateTermGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagePrivateTermGet$Json$Response(params: {
    id: number;
    term: string;

  }): Observable<StrictHttpResponse<SearchPersonalMessagesByTermQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdMessagePrivateTermGetPath, 'get');
    if (params) {

      rb.path('id', params.id);
      rb.path('term', params.term);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SearchPersonalMessagesByTermQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersUserIdMessagePrivateTermGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdMessagePrivateTermGet$Json(params: {
    id: number;
    term: string;

  }): Observable<SearchPersonalMessagesByTermQueryResult> {

    return this.apiUsersUserIdMessagePrivateTermGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SearchPersonalMessagesByTermQueryResult>) => r.body as SearchPersonalMessagesByTermQueryResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdPasswordPut
   */
  static readonly ApiUsersUserIdPasswordPutPath = '/api/Users/user/{id}/password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdPasswordPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPasswordPut$Plain$Response(params: {
    id: string;
      body?: UpdatePasswordCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdPasswordPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdPasswordPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPasswordPut$Plain(params: {
    id: string;
      body?: UpdatePasswordCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdPasswordPut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdPasswordPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPasswordPut$Json$Response(params: {
    id: string;
      body?: UpdatePasswordCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdPasswordPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdPasswordPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPasswordPut$Json(params: {
    id: string;
      body?: UpdatePasswordCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdPasswordPut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdPicturePut
   */
  static readonly ApiUsersUserIdPicturePutPath = '/api/Users/user/{id}/picture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdPicturePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPicturePut$Plain$Response(params: {
    id: string;
      body?: UpdateUserPictureCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdPicturePutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdPicturePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPicturePut$Plain(params: {
    id: string;
      body?: UpdateUserPictureCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdPicturePut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdPicturePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPicturePut$Json$Response(params: {
    id: string;
      body?: UpdateUserPictureCommand
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdPicturePutPath, 'put');
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
   * To access the full response (for headers, for example), `apiUsersUserIdPicturePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersUserIdPicturePut$Json(params: {
    id: string;
      body?: UpdateUserPictureCommand
  }): Observable<CommandResult> {

    return this.apiUsersUserIdPicturePut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * Path part for operation apiUsersUserIdStatusPut
   */
  static readonly ApiUsersUserIdStatusPutPath = '/api/Users/user/{id}/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdStatusPut$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdStatusPut$Plain$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdStatusPutPath, 'put');
    if (params) {

      rb.path('id', params.id);

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
   * To access the full response (for headers, for example), `apiUsersUserIdStatusPut$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdStatusPut$Plain(params: {
    id: number;

  }): Observable<CommandResult> {

    return this.apiUsersUserIdStatusPut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdStatusPut$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdStatusPut$Json$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdStatusPutPath, 'put');
    if (params) {

      rb.path('id', params.id);

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
   * To access the full response (for headers, for example), `apiUsersUserIdStatusPut$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdStatusPut$Json(params: {
    id: number;

  }): Observable<CommandResult> {

    return this.apiUsersUserIdStatusPut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

}
