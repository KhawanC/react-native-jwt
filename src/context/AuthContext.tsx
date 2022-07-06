import React, { createContext, useState } from 'react'
import { UsuarioType } from '../models/UsuarioType';
import { LoginService } from '../services/LoginService';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<UsuarioType>();
  
    const login = async (email: string, senha: string) => {
      const respostaServiceLogin = await LoginService(email, senha);
      if (!respostaServiceLogin) {
        return false;
      } else {
        setUser({
          id: respostaServiceLogin?.id,
          nome: respostaServiceLogin?.nome,
          email: respostaServiceLogin?.email,
          senha: respostaServiceLogin?.senha,
          token: respostaServiceLogin?.token,
        });
        return true;
      }
    };
  
    return (
      <AuthContext.Provider value={{
        login,
        user
      }}>
        {children}
      </AuthContext.Provider>
    )
  }