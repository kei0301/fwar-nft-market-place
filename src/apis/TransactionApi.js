import { axiosClient } from './axiosClient';

const TransactionApi = {
  getMyTrans({ page, userId, status, sort }) {
    const url = `/transaction/${userId}?&_status=${status}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/transaction`;
    return axiosClient.post(url, data);
  },
  getAllTrans({ page, sort }) {
    // console.log(page);
    const sortColumn = sort && sort.column ? sort.column : 'createdAt';
    const sortOrder = sort && sort.order ? sort.order : 'desc';
    const url = `/transaction?&_page=${page}&_sort=${sortColumn}&_order=${sortOrder}`;
    return axiosClient.get(url);
  }
};
export default TransactionApi;
