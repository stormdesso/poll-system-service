import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Image, Pressable} from "react-native";
import * as SecureStore from 'expo-secure-store';

import GetAccountInfo from "../../../../APIConnection/GetAccountInfo"
import updateAccount from "../../../../APIConnection/updateAccount";

import phoneNumberMask from "../../../../scripts/phoneNumberMask";
import {formatDate} from "../../../../scripts/formatDate";
import { UsersRoleNavigation } from "../../../../Data/UsersRoleNavigation";

import Input from "../../../../elements/simpleElements/Input";
import InputWithCalendar from "../../../../elements/simpleElements/InputWithCalendar";
import ButtonWithText from "../../../../elements/simpleElements/ButtonWithText";
import InputPassword from "../../../../elements/simpleElements/InputPassword";

import deleteActive from "../../../../Img/Icon/deleteActive.png"
import deleteUnactive from "../../../../Img/Icon/deleteUnactive.png"
import MyAccountBack from "../../../../Img/Icon/MyAccountBack.png"

import { MyAccountStyle } from "../../../style/MyAccountStyle";

export const MyAccount = ({navigation}) => {

    const [data, setData] = useState({})
    const [standartData, setStandartData] = useState({})
    const [editedAccount, setEditedAccount] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [number, setNumber] = useState();

    //Получение данных из апи
    const fetchData = () => {
        // Вызываем функцию GetPollList с номером страницы
        GetAccountInfo()
        .then(responseJson => {
            setData(responseJson);
            setStandartData(responseJson)
            setNumber(phoneNumberMask(responseJson.phoneNumber))
        })
        .catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    //Отменить изменения
    const handleEditToggle = () => {
        if (editedAccount === true){
            setEditedAccount(!editedAccount);
            setData(standartData)
        }
    };

    //Изменение значений у адреса
    const handleAddressChange = (index, field, value) => {
        const updatedAddressInfos = [...data.addressInfos];
        updatedAddressInfos[index][field] = value;
        setData({ ...data, addressInfos: updatedAddressInfos });
    };

    //Удалить адресс
    const handleDeleteAddress = (index) => {
        if (editedAccount === true){
            const updatedAddressInfos = data.addressInfos.filter((_, i) => i !== index);
            setData({ ...data, addressInfos: updatedAddressInfos });
        }
        
    };

    //Изменение значения полей
    const handleInputChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    //Сохранить изменения
    const saveChanges = () => {
        if (password === repeatPassword){
            updateAccount(password, updateAccount);
            handleEditToggle()
        }
    }

    return(
        <SafeAreaView>
            <View style={MyAccountStyle.Headder}>
                <Pressable style = {MyAccountStyle.ImageBox} onPress={() => {
                    SecureStore.getItemAsync('userSelectedRole')
                        .then(role => {
                        navigation.navigate(UsersRoleNavigation[role])
                        })
                    }}>
                        <Image 
                            source={MyAccountBack}
                            style = {MyAccountStyle.ImageBack}
                        />
                </Pressable>
                <Text style={MyAccountStyle.Text}>Мой аккаунт</Text>
            </View>
            <ScrollView>
                <View style={MyAccountStyle.MyAccountBox}>
                    <Input
                        label="ФИО"
                        value={data.fullName}
                        error={data.fullName === "" ? true : false}
                        onChangeText={(text) =>
                            handleInputChange('fullName', text)
                        }
                        keyboardType="default"
                        editable={editedAccount}
                    />

                    <InputWithCalendar
                        label="Дата рождения"
                        value={formatDate(data.birthdate)}
                        error={data.birthdate === "" ? true : false}
                        onChangeText={(text) => handleInputChange('birthdate', text)}
                        keyboardType="default"
                        editable={editedAccount}
                    />

                    <InputPassword
                        label="Пароль"
                        value={password}
                        error={false}
                        onChangeText={(text) => setPassword(text)}
                        keyboardType="default"
                        editable={editedAccount}
                    />

                    <InputPassword
                        label="Повторите пароль"
                        value={repeatPassword}
                        error={repeatPassword === password}
                        onChangeText={(text) => setRepeatPassword(text)}
                        keyboardType="default"
                        editable={editedAccount}
                    />

                    <Input
                        label="Номер телефона"
                        value={number}
                        error={data.phoneNumber === "" ? true : false}
                        onChangeText={(text) =>
                            handleInputChange('phoneNumber', phoneNumberMask(text))
                        }
                        keyboardType="numeric"
                        editable = {editedAccount}
                    />

                    <Input
                        label="Электронная почта"
                        value={data.email}
                        error={data.email === "" ? true : false}
                        onChangeText={(text) =>
                            handleInputChange('email', text)
                        }
                        keyboardType="default"
                        editable={editedAccount}
                    />

                    <FlatList
                        data={data.addressInfos}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={({ item, index }) => (
                            <View style={MyAccountStyle.address}>
                                <Input
                                    label="Город"
                                    value={item.city}
                                    error={item.city === "" ? true : false}
                                    onChangeText={(text) =>
                                        handleAddressChange(index, 'city', text)
                                    }
                                    keyboardType="default"
                                    editable={editedAccount}
                                />
                                <Input
                                    label="Улица"
                                    value={item.street}
                                    error={item.street === "" ? true : false}
                                    onChangeText={(text) =>
                                        handleAddressChange(index, 'street', text)
                                    }
                                    keyboardType="default"
                                    editable={editedAccount}
                                />
                                <Input
                                    label="Дом"
                                    value={item.houseNumber}
                                    error={item.houseNumber === "" ? true : false}
                                    onChangeText={(text) =>
                                        handleAddressChange(index, 'houseNumber', text)
                                    }
                                    keyboardType="default"
                                    editable={editedAccount}
                                />
                                <Input
                                    label="Квартира"
                                    value={item.apartmentNumber.toString()}
                                    error={item.apartmentNumber.toString() === "" ? true : false}
                                    onChangeText={(text) =>
                                        handleAddressChange(index, 'apartmentNumber', text)
                                    }
                                    keyboardType="default"
                                    editable={editedAccount}
                                />
                                <TouchableOpacity style = {MyAccountStyle.SortedButton} onPress={() => handleDeleteAddress(index)}>
                                    <Image 
                                        source={deleteUnactive} 
                                        style = {MyAccountStyle.Image}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <View style={MyAccountStyle.ButtonBox}>
                        {editedAccount === false ? (
                            <ButtonWithText label="Редактировать" onPress={() => handleEditToggle()} />
                        ) : (
                            <ButtonWithText label="Сохранить" onPress={() => saveChanges()} />
                        )}
                        <ButtonWithText label="Отменить" onPress={() => handleEditToggle()} />
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    
  });