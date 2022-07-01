import { axiosClient } from './axiosClient';

const CombatHistoryApi = {
  get({ page, userId }) {
    const url = `/history-game?userId=${userId}&page=${page}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/transaction`;
    return axiosClient.post(url, data);
  }
};
export default CombatHistoryApi;
