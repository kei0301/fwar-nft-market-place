import { axiosClient } from './axiosClient';

const TeamApi = {
  getALl() {
    const url = `/team`;
    return axiosClient.get(url);
  }
};
export default TeamApi;
