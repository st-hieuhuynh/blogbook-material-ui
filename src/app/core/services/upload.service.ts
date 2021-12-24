import axios from 'axios';
import { SignatureService } from './signature.service';

const signatureService = new SignatureService();

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadImage = async (body: any) => {
  const { typeUpload, picture } = body;
  if (!picture.name) return;
  const getSignInfo = {
    type_upload: typeUpload,
    file_name: picture.name,
    file_type: picture.type,
  };
  return await signatureService
    .getSignURL(getSignInfo)
    .then((signedRes: any) => {
      return axiosClient
        .put(signedRes.signedRequest, picture)
        .then(() => {
          return signedRes.url;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {});
};
