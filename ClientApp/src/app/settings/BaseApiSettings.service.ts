
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseApiSettingsService {

    defaultUrl: string = 'https://localhost:44312/';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

}