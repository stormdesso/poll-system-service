import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, ScrollView, Alert, Image, Pressable} from "react-native";
import * as SecureStore from 'expo-secure-store';

import GetAccountInfo from "../../../../APIConnection/GetAccountInfo"
import updateAccount from "../../../../APIConnection/updateAccount";
import DeleteAddressAPI from "../../../../APIConnection/DeleteAddressAPI"

import { transformObjectToRegistration } from "../../../../scripts/transformObjectToRegistration";

import phoneNumberMask from "../../../../scripts/phoneNumberMask";
import {formatDate} from "../../../../scripts/formatDate";
import { UsersRoleNavigation } from "../../../../Data/UsersRoleNavigation";

import Input from "../../../../elements/simpleElements/Input";
import InputWithCalendar from "../../../../elements/simpleElements/InputWithCalendar";
import ButtonWithText from "../../../../elements/simpleElements/ButtonWithText";
import InputPassword from "../../../../elements/simpleElements/InputPassword";
import InputAddressWithDropDownList from "../../../../elements/simpleElements/InputAddressWithDropDownList";

import deleteActive from "../../../../Img/Icon/deleteActive.png"
import MyAccountBack from "../../../../Img/Icon/MyAccountBack.png"
import add from "../../../../Img/Icon/add.png"

import { MyAccountStyle } from "../../../style/MyAccountStyle";
import { ColorProperties } from "../../../../Data/ColorProperties";

export const MyAccount = ({navigation}) => {

    const [data, setData] = useState({})
    const [standartData, setStandartData] = useState({})
    const [editedAccount, setEditedAccount] = useState(false);

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [address, setAddress] = useState("")

    const [number, setNumber] = useState();

    const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
    const [color, setColor] = useState(ColorProperties.textColorInPollInfoCard);
    const [labelColor, setLabelColor] = useState(ColorProperties.lableColor);
    const [backgroundColorContainer, setBackgroundColorContainer] = useState(ColorProperties.containerColorInPollInfoCard);


    //Получение данных из апи
    const fetchData = () => {
        // Вызываем функцию GetPollList с номером страницы
        GetAccountInfo()
        .then(responseJson => {
            setData(responseJson);
            setStandartData(responseJson)
            setNumber(phoneNumberMask(responseJson.phoneNumber))
            setLabelColor(ColorProperties.lableColor)
        })
        .catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchData();
        const updateColor = () => {
            setBackgroundColor(ColorProperties.backgroundColor);
            setColor(ColorProperties.textColorInPollInfoCard)
            setBackgroundColorContainer(ColorProperties.containerColorInPollInfoCard)
        };
        
        ColorProperties.subscribe(updateColor);
        return () => ColorProperties.unsubscribe(updateColor);
    }, [])

    //Редактировать
    const handleEditToggle = () => {
        if (editedAccount === false){
            setEditedAccount(!editedAccount);
        }
    };

    //Отмена
    const handleCancelToggle = () => {
        if (editedAccount === true){
            setEditedAccount(!editedAccount);
            setData(standartData)
        }
    };

    //Добавить адресс
    const handleAddAddress = (text) => {
        console.log(text)
        const addressParts = text.split(', ');
  
        const city = addressParts[0].replace("г ", "");
        const street = addressParts[1].replace("ул ", "");
        const houseNumber = addressParts[2].replace("д ", "");
        const apartmentNumber = addressParts[3].replace("кв ", "");

        const addressToAdd =
            {
                city: city,
                street: street,
                houseNumber: houseNumber,
                apartmentNumber: parseInt(apartmentNumber, 10)
            }

        Alert.alert('Добавление адреса', `Выдействительно хотите добавить: ${text}`, [
            {
                text: 'Отмена',
                style: 'cancel',
            },
            {
                text: 'Добавить',
                onPress: () => {
                    DeleteAddressAPI(addressToAdd)
                },
            },
        ])
        
    };

    //Удалить адресс
    const handleDeleteAddress = (index, text) => {
        Alert.alert('Удаление адреса', `Выдействительно хотите удалить: ${text}`, [
            {
                text: 'Отмена',
                style: 'cancel',
            },
            {
                text: 'Удалить',
                onPress: () => {
                    const address = data.addressInfos[index];
                    DeleteAddressAPI(address)
                    const updatedAddressInfos = data.addressInfos.filter((_, i) => i !== index);
                    setData({ ...data, addressInfos: updatedAddressInfos });
                },
            },
        ])
        
    };

    //Изменение значения полей
    const handleInputChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    //Сохранить изменения
    const saveChanges = () => {
        if (password === repeatPassword){
            updateAccount(password, transformObjectToRegistration(data));
            handleEditToggle()
        }
        handleCancelToggle();
    }

    return(
        <SafeAreaView style={{backgroundColor: backgroundColor, height: "100%"}}>
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
                <Text style={[MyAccountStyle.Text, {labelColor}]}>Мой аккаунт</Text>
            </View>
            <ScrollView>
                <View style={MyAccountStyle.MyAccountBox}>
                    <View style={[MyAccountStyle.InfoBox, {backgroundColor: backgroundColorContainer}, {borderColor: backgroundColorContainer}]}>
                        <Text style={[MyAccountStyle.NameBoxText, {labelColor}]}>Личная иформация: </Text>
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
                            error={repeatPassword === password & repeatPassword.length > 0 & password.length > 0}
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
                        <View style={MyAccountStyle.ButtonBox}>
                            {editedAccount === false ? (
                                <ButtonWithText label="Редактировать" onPress={() => handleEditToggle()} />
                            ) : (
                                <ButtonWithText label="Сохранить" onPress={() => saveChanges()} />
                            )}
                            <ButtonWithText label="Отменить" onPress={() => handleCancelToggle()} />
                        </View>
                    </View>

                    <View style={[MyAccountStyle.InfoBoxAddAddress, {backgroundColor: backgroundColorContainer}, {borderColor: backgroundColorContainer}]}>
                        <InputAddressWithDropDownList
                            label="Добавить адресс"
                            value={address}
                            error={false}
                            onChangeText={(text) => {
                                setAddress(text);
                            }}
                            keyboardType="default"
                            page={"MyAccount"}
                        />
                        <Pressable style = {MyAccountStyle.SortedButton} onPress={() => handleAddAddress(address)}>
                            <Image 
                                source={add} 
                                style = {MyAccountStyle.ImageAdd}
                            />
                        </Pressable>
                    </View>
                    
                    <View style={[MyAccountStyle.InfoBox, {backgroundColor: backgroundColorContainer}, {borderColor: backgroundColorContainer}]}>
                        <Text style={[MyAccountStyle.NameBoxText2, {labelColor}]}>Мои адреса: </Text>
                        {Array.isArray(data.addressInfos) && data.addressInfos.map((item, index) => (
                            <View key={`${item.id}-${index}`} style={MyAccountStyle.address}>
                                <Text style={[MyAccountStyle.AddressText, {color}]}>
                                    {`Город: ${item.city}, Улица: ${item.street}, Дом: ${item.houseNumber}, Квартира: ${item.apartmentNumber}`}
                                </Text>
                                <Pressable style = {MyAccountStyle.SortedButton} onPress={() => handleDeleteAddress(index, `Город: ${item.city}, Улица: ${item.street}, Дом: ${item.houseNumber}, Квартира: ${item.apartmentNumber}`)}>
                                    <Image 
                                        source={deleteActive} 
                                        style = {MyAccountStyle.Image}
                                    />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                    
                    
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}