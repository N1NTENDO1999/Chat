/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GetGoogleUserTokenQuery } from '../models/get-google-user-token-query';
import { GetGoogleUserTokenQueryResult } from '../models/get-google-user-token-query-result';
import { GetTokenQuery } from '../models/get-token-query';
import { GetTokenQueryResult } from '../models/get-token-query-result';

@Injectable({
  providedIn: 'root',
})
export class TokensService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTokensPost
   */
  static readonly ApiTokensPostPath = '/api/Tokens';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTokensPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensPost$Plain$Response(params?: {
      body?: GetTokenQuery
  }): Observable<StrictHttpResponse<GetTokenQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.ApiTokensPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetTokenQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTokensPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensPost$Plain(params?: {
      body?: GetTokenQuery
  }): Observable<GetTokenQueryResult> {

    return this.apiTokensPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetTokenQueryResult>) => r.body as GetTokenQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTokensPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensPost$Json$Response(params?: {
      body?: GetTokenQuery
  }): Observable<StrictHttpResponse<GetTokenQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.ApiTokensPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetTokenQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTokensPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensPost$Json(params?: {
      body?: GetTokenQuery
  }): Observable<GetTokenQueryResult> {

    return this.apiTokensPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetTokenQueryResult>) => r.body as GetTokenQueryResult)
    );
  }

  /**
   * Path part for operation apiTokensGooglePost
   */
  static readonly ApiTokensGooglePostPath = '/api/Tokens/google';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTokensGooglePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensGooglePost$Plain$Response(params?: {
      body?: GetGoogleUserTokenQuery
  }): Observable<StrictHttpResponse<GetGoogleUserTokenQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.ApiTokensGooglePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetGoogleUserTokenQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTokensGooglePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensGooglePost$Plain(params?: {
      body?: GetGoogleUserTokenQuery
  }): Observable<GetGoogleUserTokenQueryResult> {

    return this.apiTokensGooglePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<GetGoogleUserTokenQueryResult>) => r.body as GetGoogleUserTokenQueryResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTokensGooglePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensGooglePost$Json$Response(params?: {
      body?: GetGoogleUserTokenQuery
  }): Observable<StrictHttpResponse<GetGoogleUserTokenQueryResult>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.ApiTokensGooglePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetGoogleUserTokenQueryResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTokensGooglePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokensGooglePost$Json(params?: {
      body?: GetGoogleUserTokenQuery
  }): Observable<GetGoogleUserTokenQueryResult> {

    return this.apiTokensGooglePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<GetGoogleUserTokenQueryResult>) => r.body as GetGoogleUserTokenQueryResult)
    );
  }

}
