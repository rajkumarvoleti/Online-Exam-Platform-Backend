import { customRequest } from ".";

export const googleSigninRequest = ({accessToken}:{accessToken:string}) => {
  return customRequest({url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, method: 'get', headers:   {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json'
  }
});
}


