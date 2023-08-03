import axios, { AxiosError, AxiosResponse } from 'axios'

const client = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` })

export const customRequest = ({ ...options }) => {
  const onSuccess = (response:AxiosResponse) => {
    console.log("response");
    console.log(response);
    return response.data;
  }
  const onError = (error:AxiosError) => {
    console.log("error");
    console.log(error);
    return error.response?.data;
  }
  return client(options).then(onSuccess).catch(onError);
}