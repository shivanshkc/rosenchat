import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface IConfig {
  key: string;
}

@Injectable()
export class ConfigService {
  private readonly CONFIG_URL = 'assets/config.json';
  private isLoaded = false;
  private configs?: IConfig;

  constructor(private readonly http: HttpClient) {}

  public async get(): Promise<IConfig> {
    if (!this.isLoaded) {
      this.configs = await firstValueFrom(this.http.get<IConfig>(this.CONFIG_URL));
      this.isLoaded = true;
    }
    if (this.configs === undefined) {
      throw new Error('Failed to load the configs.');
    }
    return this.configs;
  }
}
