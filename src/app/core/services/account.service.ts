import { AxiosRequestConfig } from 'axios';
import AuthHelper from '../helpers/authHelper';
import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';
import { User } from '../constants/entity/User';

export class AccountService extends AuthHelper {
  http = new ApiService();

  constructor() {
    super();
  }

  async getPersonalInfo() {
    const userInfo: any = await this.http.get([ENDPOINT.users.userMe]);
    delete userInfo.email;
    delete userInfo.id;
    delete userInfo.isActive;
    delete userInfo.isAdmin;
    delete userInfo.verifyAt;
    delete userInfo.createdAt;
    delete userInfo.updatedAt;
    delete userInfo.followers;
    delete userInfo.followings;
    delete userInfo.isFollowed;
    delete userInfo.picture;

    const uniqueDisplayName = () => Date.now().toString();
    userInfo['phone'] = userInfo['phone'] || '0909090909';
    userInfo['displayName'] =
      userInfo['displayName'] || `user${uniqueDisplayName()}`;
    userInfo['gender'] = userInfo['gender'] || 'male';
    userInfo['dob'] = userInfo['dob'] || '2000-01-01';

    return this.http.put([ENDPOINT.users.userMe], userInfo);
  }

  async updatePassword(body) {
    return this.http.put([ENDPOINT.users.changePassword], body);
  }

  async updatePersonalInfo(body) {
    return this.http.put([ENDPOINT.users.userMe], body);
  }

  async uploadImage(body) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'not-set',
        'Content-Type': 'image/png',
      },
      baseURL: null,
    };
    return this.http.put([body.url], body.picture, config);
  }
}
