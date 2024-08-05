import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosService {
  async request(config: AxiosRequestConfig): Promise<any> {
    const response = await axios(config);
    return response.data;
  }
}
