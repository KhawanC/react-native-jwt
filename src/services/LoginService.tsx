import React from 'react';
import { AxiosInstance } from '../api/AxiosInstance';
import jwt_decode from 'jwt-decode';

export const LoginService = async (email: string, senha: string) => {
  var tokenDecodificado: any = null;

  try {
    const resposta = await AxiosInstance.post('/autenticacao', { "email": email, "senha": senha });
    if (resposta.status === 201) {
      tokenDecodificado = jwt_decode(resposta.data.token);
      tokenDecodificado['token'] = resposta.data.token;
      return tokenDecodificado;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Erro ao realizar login: ' + JSON.stringify(error));
    return false;
  }
};
