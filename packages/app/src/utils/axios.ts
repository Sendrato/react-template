import axios from 'axios';

import { appConfig } from '@config';

export const api = axios.create({
  baseURL: appConfig.apiUrl,
});

export const addHeader = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
});

export const addAuthHeader = (token: string, tenant: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'x-navajo-tenant': tenant,
});
