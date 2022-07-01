import { axiosClient } from './axiosClient';

const OpenChestHistoryApi = {
  getAll(userId, page) {
    const url = `/chest?_userId=${userId}&_page=${page}`;
    return axiosClient.get(url);
  }
};
export default OpenChestHistoryApi;
