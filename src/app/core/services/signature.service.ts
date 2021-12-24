import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class SignatureService {
  http = new ApiService();

  constructor() {}

  async getSignURL(body: any) {
    return this.http.get([ENDPOINT.signatures.index], body);
  }
}
