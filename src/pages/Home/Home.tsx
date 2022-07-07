import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text, Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { AuthService } from '../../services/AuthService';
import { Button, Card } from 'react-native-elements';
import { CarrouselCard } from '../../components/cardCarrossel/CardCarrossel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

export const Home = ({navigation}:any) => {
    const [isLoadingPage, setLoadingPage] = useState(true);
    const [botaoAtivo, setBotaoAtivo] = useState(1);
    const modalizePerfilRef = useRef(null);
    const modalizeSearchRef = useRef(null);
    const modalizeAddRef = useRef(null);
    const {width, height} = Dimensions.get('screen');
    const numColumns = 1;

    const loadJWT = async() => {
        try {
            let token = await AsyncStorage.getItem('Token')
            if(token !== null) {
                setLoadingPage(false)
                checkJWT(token)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkJWT = async(token:string) => {
        try {
            const res = await AuthService(token);
            if(res?.status !== 200){
                await AsyncStorage.removeItem('Token')
                navigation.navigate('Login')
            } else {
                setLoadingPage(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadJWT()
    }, [])

    const task = [
        {
            id: 1,
            titulo: 'Lavar a louça',
            descricao: 'Eu devo lavar a loçasdasdasdsadasdasdsadas',
            isCompleto: true
        },
        {
            id: 2,
            titulo: 'Lavar a louça',
            descricao: 'Eu devo lavar a louça',
            isCompleto: false
        },
        {
            id: 3,
            titulo: 'Lavar a louça',
            descricao: 'Eu devo lavar a louça',
            isCompleto: true
        },
        {
            id: 4,
            titulo: 'Lavar a louça',
            descricao: 'Eu devo lavar a louça',
            isCompleto: true
        },
        {
            id: 5,
            titulo: 'Lavar a louça',
            descricao: 'Eu devo lavar a louça',
            isCompleto: false
        },
    ]

    return(
        <>
            {isLoadingPage ? <View style={styles.containerLoading}>
                <ActivityIndicator size='large'/>
              </View> : 
            <View style={styles.container}>
                <View style={styles.boxWelcome}>
                    <TouchableOpacity onPress={() => modalizePerfilRef.current?.open()}>
                        <IconMatCom name="account" size={25} color="black" style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxTextWelcome}>
                    <Text style={styles.tituloWelcome}>Olá, </Text>
                    <Text style={styles.subWelcome}>Tenha um bom dia</Text>
                </View>
                <View style={styles.boxButtons}>
                    <Button buttonStyle={botaoAtivo === 1 ? styles.buttonStyleActive : styles.buttonStyleDisable}
                        title='Tarefas' onPress={() => setBotaoAtivo(e => 1)}/>
                    <Button buttonStyle={botaoAtivo === 2 ? styles.buttonStyleActive : styles.buttonStyleDisable}
                        title='Em progresso' onPress={() => setBotaoAtivo(e => 2)}/>
                    <Button buttonStyle={botaoAtivo === 3 ? styles.buttonStyleActive : styles.buttonStyleDisable}
                        title='Finalizadas' onPress={() => setBotaoAtivo(e => 3)}/>
                </View>
                <View style={styles.boxCarousel}>
                <FlatList
                    data={task.reverse()}
                    horizontal
                    numColumns={numColumns}
                    renderItem={({item}) => (
                        <CarrouselCard key={item.id} id={item.id} descricao={item.descricao} titulo={item.titulo} isCompleto={item.isCompleto}/>
                    )}/>
                </View>
                <View style={styles.boxSearchAndAdd}>
                    <TouchableOpacity onPress={() => modalizeAddRef.current?.open()}>
                        <IconIonic name='add' size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalizeSearchRef.current?.open()}>
                        <IconIonic name='search-outline' size={40}/>
                    </TouchableOpacity>
                </View>
                <Modalize
                    ref={modalizePerfilRef}
                    HeaderComponent={
                        <Text>Hello World</Text>
                    }
                    modalHeight={height/1.4}
                    snapPoint={height/1.4}>

                    <View>
                        <Text>Perfil</Text>
                    </View>
                </Modalize>
                <Modalize
                    ref={modalizeSearchRef}
                    HeaderComponent={
                        <Text>Hello World</Text>
                    }
                    modalHeight={height/1.4}
                    snapPoint={height/1.4}>

                    <View>
                        <Text>Search</Text>
                    </View>
                </Modalize>
                <Modalize
                    ref={modalizeAddRef}
                    HeaderComponent={
                        <Text>Hello World</Text>
                    }
                    modalHeight={height/1.4}
                    snapPoint={height/1.4}>

                    <View>
                        <Text>Add</Text>
                    </View>
                </Modalize>
            </View>}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    containerLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxWelcome: {
        width: '100%',
        marginTop: 35,
        marginRight: 55,
        alignItems: 'flex-end',
    },
    iconStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    boxTextWelcome: {
        width: '100%',
        marginLeft: 55,
        alignItems: 'flex-start',
    },
    tituloWelcome: {
        fontSize: 51,
        fontWeight: '800',
    },
    subWelcome: {
        fontSize: 21,
        color: 'grey',
        marginTop: 4,
    },
    boxButtons: {
        width: '100%',
        marginTop: 30,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonStyleActive: {
        width: 120,
        height: 35,
        borderRadius: 20,
    },
    buttonStyleDisable: {
        width: 120,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#afafaf'
    },
    boxCarousel: {
        width: '100%',
        height: 300
    },
    boxSearchAndAdd: {
        width: '80%',
        marginTop: 140,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: '#00a2ff',
        borderWidth: 2,
        borderRadius: 40,

    },
});
