import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Input, Text, Button } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { login } = useContext(AuthContext)

    const logar = async (v1:string, v2:string) => {
        const res = await login(v1, v2);
        console.log('A resposta do login é: '+res)
    }

    return(
        <HideKeyboard>
            <View style={styles.container}>
                <View style={styles.boxLogo}>
                    <Text style={styles.textLogo}>LOGO PROVISÓRIA</Text>
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
                        onPress={() => {logar(email, senha); console.log('cliquei')}}
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
