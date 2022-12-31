import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface IConfig {
  authorizer: { baseURL: string };
  rosenbridge: { baseURL: string };
}

@Injectable()
export class ConfigService {
  private readonly CONFIG_URL = 'assets/secrets/config.json';
  
  private isLoaded = false;
  private configs?: IConfig;

  constructor(private readonly _http: HttpClient) {}

  public async get(): Promise<IConfig> {
    if (!this.isLoaded) {
      this.configs = await firstValueFrom(this._http.get<IConfig>(this.CONFIG_URL));
      this.isLoaded = true;
    }

    if (!this.configs) {
      throw new Error('Failed to load the configs.');
    }

    return this.configs;
  }
}
