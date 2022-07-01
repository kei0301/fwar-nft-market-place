import { axiosClient } from './axiosClient';
// import { getToken, getUserInfo } from '../utils/LocalStorage';

const UserApi = {
  getTeam(userId, role) {
    const url = `/player?_userId=${userId}&_role=${role}`;
    return axiosClient.get(url);
  },
  registration(data) {
    const url = `/player`;
    return axiosClient.post(url, data);
  },
  find(address) {
    const url = `/user?address=${address}`;
    return axiosClient.get(url);
  },
  getRanking(address) {
    const url = `/player/?address=${address}`;
    return axiosClient.get(url);
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
