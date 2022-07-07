import React from 'react';
import { AxiosInstance } from '../api/AxiosInstance';
import jwt_decode from 'jwt-decode';

export const LoginService = async (email: string, senha: string) => {
  var tokenDecodificado: any = null;

    try {
      const res = await AxiosInstance.post('/autenticacao', { "email": email, "senha": senha });
      tokenDecodificado = jwt_decode(res.data.token);
      tokenDecodificado['token'] = res.data.token;
      return tokenDecodificado;
    } catch (error) {
      return undefined
    }
};
