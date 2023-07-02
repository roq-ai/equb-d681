import axios from 'axios';
import queryString from 'query-string';
import { FinanceSharingInterface, FinanceSharingGetQueryInterface } from 'interfaces/finance-sharing';
import { GetQueryInterface } from '../../interfaces';

export const getFinanceSharings = async (query?: FinanceSharingGetQueryInterface) => {
  const response = await axios.get(`/api/finance-sharings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinanceSharing = async (financeSharing: FinanceSharingInterface) => {
  const response = await axios.post('/api/finance-sharings', financeSharing);
  return response.data;
};

export const updateFinanceSharingById = async (id: string, financeSharing: FinanceSharingInterface) => {
  const response = await axios.put(`/api/finance-sharings/${id}`, financeSharing);
  return response.data;
};

export const getFinanceSharingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/finance-sharings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinanceSharingById = async (id: string) => {
  const response = await axios.delete(`/api/finance-sharings/${id}`);
  return response.data;
};
