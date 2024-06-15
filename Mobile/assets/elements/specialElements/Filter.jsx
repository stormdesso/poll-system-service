import React, { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";

import Modal from 'react-native-modal';

import { ColorProperties } from "../../Data/ColorProperties";
import { FilterStyle } from "../styleSpecialElements/FilterStyle";

import InputBoxWithDropdown from "../simpleElements/InputBoxWithDropdown"
import InputWithCalendar from "../simpleElements/InputWithCalendar"
import ButtonWithText from "../simpleElements/ButtonWithText"

import { StatusState } from "../../Data/StatusState";
import { CyclicalState } from "../../Data/CyclicalState";
import { UserIsVoidedProp } from "../../Data/UserIsVoidedProp"

import {SearchProp} from "../../Data/SearchProp"

import filterImg from "../../Img/Icon/filter.png"

export const Filter = ({navigation}) => {

    const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
    const [filter, setFilter] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValues, setInputValues] = useState({
        status: "",
        startDate: "",
        endDate: "",
        cyclical: "",
        userIsVoted: "",
      });

    //Получение цветов
    useEffect(() => {
        const updateColor = () => {
            setBackgroundColor(ColorProperties.backgroundColor);
        };

        ColorProperties.subscribe(updateColor);
        return () => ColorProperties.unsubscribe(updateColor);
    }, []);

    //Состояние показа/скрытия модального окна
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    //Заполнение поля фильтра
    const addFilter = (key, value) => {
        setInputValues((prevState) => ({
            ...prevState,
            [key]: value,
          }));
    }

    //Формирование общего фильтра при их применении
    const gatherFilter = () => {
        setFilter([])
        for (const [key, value] of Object.entries(inputValues)) {
            if (value !== "") {
                if (key === "cyclical") 
                {
                    filter.push(
                        {
                            "key": key,
                            "value": CyclicalState[value],
                        },
                    )
                }
                else if(key === "userIsVoted")
                {
                    filter.push(
                        {
                            "key": key,
                            "value": UserIsVoidedProp[value],
                        },
                    )
                }
                else if(key === "status")
                {
                    filter.push(
                        {
                            "key": key,
                            "value": StatusState[value],
                        },
                    )
                }
                else
                {
                    filter.push(
                        {
                            "key": key,
                            "value": value,
                        },
                    )
                } 
            }
        }
        SearchProp.setFilterPollPage(filter)
        toggleModal()
    }

    //Отчистить фильтр
    const clearFilter = () => {
        setFilter([]);
        for (const key in inputValues) {
            if (inputValues.hasOwnProperty(key)) {
                inputValues[key] = "";
            }
        }
        SearchProp.setFilterPollPage([])
        toggleModal()
    }


    return (
        <View style={[FilterStyle.container, {backgroundColor}]}>
            <TouchableOpacity style = {FilterStyle.SortedButton} onPress={toggleModal}>
                <Image 
                    source={filterImg} 
                    style = {FilterStyle.Image}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    toggleModal();
                }}
                style={[FilterStyle.modal, {backgroundColor}]}
            >
                <View style={[FilterStyle.FilterContainer, {backgroundColor}]}>
                    <Text style={[FilterStyle.Text, {backgroundColor}]}>Фильтр</Text>
                    <View style={[FilterStyle.FilterContainerEntities, {backgroundColor}]}>
                        <InputBoxWithDropdown
                            label="Статус опроса"
                            value={inputValues.status}
                            onChangeText={(text) => {
                                addFilter("status", text);
                            }}
                            keyboardType="default"
                            data = {StatusState}
                            styleNameDropdown = {"StatusDropdown"}
                            styleNameDropdownBox = {"StatusDropdownBox"}
                            disabled={false}
                        />

                        <InputWithCalendar
                            label="Дата начала"
                            value={inputValues.startDate}
                            onChangeText={(text) => addFilter("startDate", text)}
                            keyboardType="default"
                            editable={true}
                        />

                        <InputWithCalendar
                            label="Дата окончания"
                            value={inputValues.endDate}
                            onChangeText={(text) => addFilter("endDate", text)}
                            keyboardType="default"
                            editable={true}
                        />

                        <InputBoxWithDropdown
                            label="Циклический опрос"
                            value={inputValues.cyclical}
                            onChangeText={(text) => {
                                addFilter("cyclical", text);
                            }}
                            keyboardType="default"
                            data = {CyclicalState}
                            styleNameDropdown = {"IsCyclicalDropdown"}
                            styleNameDropdownBox = {"IsCyclicalDropdownBox"}
                            disabled={false}
                        />

                        <InputBoxWithDropdown
                            label="Только те в которых голосовал / не голосовал"
                            value={inputValues.userIsVoted}
                            onChangeText={(text) => {
                                addFilter("userIsVoted", text);
                            }}
                            keyboardType="default"
                            data = {UserIsVoidedProp}
                            styleNameDropdown = {"IsVoitedDropdown"}
                            styleNameDropdownBox = {"IsVoitedDropdownBox"}
                            disabled={false}
                        />
                    </View>
                    <View style={[FilterStyle.FilterContainerButton, {backgroundColor}]}>
                        <ButtonWithText label="Применить" onPress={() => gatherFilter()} />
                        <ButtonWithText label="Отчистить" onPress={() => clearFilter()} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}