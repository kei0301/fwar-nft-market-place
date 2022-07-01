import { axiosClient } from './axiosClient';
// import { getToken, getUserInfo } from '../utils/LocalStorage';

const UserApi = {
  signup(data) {
    const url = `/auth/signup`;
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = `/auth/login`;
    return axiosClient.post(url, data);
  },
  find(address) {
    const url = `/user?address=${address}`;
    return axiosClient.get(url);
  },
  existUser(userId, name) {
    const url = `/user/exist?userId=${userId}&name=${name}`;
    return axiosClient.get(url);
  },
  updateName(data) {
    const url = `/user`;
    return axiosClient.put(url, data);
  }

  // getAll() {
  //   const url = `user`;
  //   const { token } = getToken();
  //   axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   return axiosClient.get(url);
  // },
  // update(id, data) {
  //   const url = `/api/user/update/${id}`;
  //   const token = getToken();
  //   axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   return axiosClient.patch(url, data);
  // }
};
export default UserApi;
