import { axiosClient } from './axiosClient';

const LeaderBoardApi = {
  GetLeaderBoard({ teamId, element }) {
    element = element && element ? element : '';
    teamId = teamId ? teamId : '';
    const url = `/character/ranks?&_element=${element}&_teamId=${teamId}`;
    return axiosClient.get(url);
  }
};
export default LeaderBoardApi;
