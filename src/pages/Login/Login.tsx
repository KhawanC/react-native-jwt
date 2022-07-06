import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Input, Text, Button } from 'react-native-elements'
import getRealm from '../../api/RealmInstance';
import { IUsuario } from '../../models/interface/IUsuario';
import { LoginService } from '../../services/LoginService';

export const Login = ({navigation}:any) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    const logar = async (v1:string, v2:string) => {
        const res = await LoginService(v1, v2);
        console.log('A resposta do login é: '+ res)
        if(res !== null) {
          console.log(res)
          navigation.navigate('Home')
        } else {
          console.log('Não foi possível logar')
        }
    }

    const getLastJWT = async () => {
      const realm = await getRealm();
      try {
        const res = realm.objects<IUsuario>('Usuario');
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    return(
        <HideKeyboard>
            <View style={styles.container}>
                <View style={styles.boxLogo}>
                    <Text style={styles.textLogo}>LOGO PROVISÓRIA DE UMA EMPRESA FICTÍCIA</Text>
                </View>
                <View style={styles.boxFormulario}>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        placeholderTextColor={'#a49595'}
                        onChangeText={setEmail}
                        placeholder='Email'/>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        placeholderTextColor={'#a49595'}
                        onChangeText={setSenha}
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
            </View>
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
