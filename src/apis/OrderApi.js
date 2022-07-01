import { axiosClient } from './axiosClient';

const OrderApi = {
  getMyOrder({ page, userId, status, sort }) {
    const url = `/order/${userId}?&_status=${status}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/order`;
    return axiosClient.post(url, data);
  },
  getAll({ page, rarity, element, teamId, level, typeCard, sort }) {
    rarity = rarity && rarity.value ? rarity.value : '';
    element = element && element.value ? element.value : '';
    teamId = teamId && teamId.value ? teamId.value : '';
    level = level ? level : '';
    typeCard = typeCard && typeCard.value ? typeCard.value : '';

    const sortColumn = sort && sort.column ? sort.column : 'createdAt';
    const sortOrder = sort && sort.order ? sort.order : 'desc';
    const url = `/order?&_page=${page}&_rarity=${rarity}&_element=${element}&_teamId=${teamId}&_level=${level}&_cardType=${typeCard}&_sort=${sortColumn}&_order=${sortOrder}`;
    return axiosClient.get(url);
  }
};
export default OrderApi;
