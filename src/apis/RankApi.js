import { axiosClient } from './axiosClient';

const RankApi = {
  getAllRanks(role) {
    const url = `/player/rank?_role=${role}`;
    return axiosClient.get(url);
  }
};
export default RankApi;
