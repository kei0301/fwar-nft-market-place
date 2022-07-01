import { axiosClient } from './axiosClient';
// import { getToken, getUserInfo } from '../utils/LocalStorage';

const HistoryBuyTicketApi = {
  getTicket(userId, currentPage) {
    const url = `/ticket?userId=${userId}&page=${currentPage}`;
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
export default HistoryBuyTicketApi;
