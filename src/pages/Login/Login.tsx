import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Text, Button } from 'react-native-elements'
import { LoginService } from '../../services/LoginService';
import { AuthService } from '../../services/AuthService';

export const Login = ({navigation}:any) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoading, setLoading] = useState(true)

    const logar = async (v1:string, v2:string) => {
        const res = await LoginService(v1, v2);
        if (res !== undefined) {
          saveJWT(res.token, res.nome, res.email)
          navigation.navigate('Home')
        } else {
          console.log('Não foi possivel recuperar o token')
        }   
    }

    const saveJWT = async(token:string, nome:string, email:string) => {
      try {
        const dados = {
          email: email,
          nome: nome,
          tasks: []
        }
        await AsyncStorage.setItem("Token", token)
        const oldUser = await AsyncStorage.getItem(email)
        if(oldUser !== null){
          await AsyncStorage.setItem(email, JSON.stringify(dados))
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    const checkJWT = async() => {
      try {
        const token = await AsyncStorage.getItem('Token')
        if(token === null){
          setLoading(false)
        } else {
          const res = await AuthService(token);
          if(res?.status === 200) {
            navigation.navigate('Home')
          } else {
            setLoading(false)
          }
        }
      } catch (error) {
        
      }
    }

    function limparInput() {
      setEmail(e => '')
      setSenha(e => '')
    }

    useEffect(() => {
      limparInput()
      setTimeout(function(){
        checkJWT()
      }, 800)
    }, [])

    return(
        <HideKeyboard>
            {isLoading ? <View style={styles.containerLoading}>
                <ActivityIndicator size='large'/>
              </View> :
            <View style={styles.container}>
            <View style={styles.boxLogo}>
                <Text style={styles.textLogo}>LOGO PROVISÓRIA DE UMA EMPRESA FICTÍCIA</Text>
            </View>
            <View style={styles.boxFormulario}>
                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholderTextColor={'#a49595'}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'/>
                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholderTextColor={'#a49595'}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={true}
                    placeholder='Senha'/>
            </View>
            <View style={styles.boxLogin}>
                <Button
                    onPress={() => logar(email, senha)}
                    title={'Entrar'}
                    containerStyle={styles.containerBotao}
                    buttonStyle={styles.button}/>
            </View>
            <View style={styles.boxNewForms}>
                <TouchableOpacity>
                    <Text>Registrar-se</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.boxInfoExtras}>
                <Text>Para mais informações digite www.google.com.br</Text>
            </View>
          </View>}
        </HideKeyboard>
 
    );
};

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLogo: {
    width: '100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogo: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 25
  },
  boxFormulario: {
    width: '100%',
    height: 170,
    justifyContent:'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  inputContainer: {
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#cfcfcf',
    borderRadius: 10,
  },
  boxLogin: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
  },
  button: {
    borderRadius: 10,
  },
  containerBotao: {
    width: 190,
    height: 50,
  },
  boxNewForms: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boxInfoExtras: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
