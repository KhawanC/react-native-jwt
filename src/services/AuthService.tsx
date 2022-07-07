import React from 'react';
import { AxiosInstance } from '../api/AxiosInstance';
import jwt_decode from 'jwt-decode';

export const AuthService = async (token: string) => {
    try {
      const res = await AxiosInstance.get('/auth', {
        headers: {'token': token}
      });
      return res;
    } catch (error) {
      return undefined
    }
};
