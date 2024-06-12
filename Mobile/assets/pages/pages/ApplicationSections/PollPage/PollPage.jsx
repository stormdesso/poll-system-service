import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from "react-native";

import GetPollList from "../../../../APIConnection/GetPollList"

import { SearchProp } from '../../../../Data/SearchProp';

import {Headder} from "../../../../elements/specialElements/Headder"
import {ShortPollCard} from "../../../../elements/specialElements/ShortPollCard"

import {PollPageStyle} from "../../../style/PollPageStyle"

import { ColorProperties } from '../../../../Data/ColorProperties';

export const PollPage = ({navigation}) => {
  //Данные
  const [data, setData] = useState([]);
  //Страница
  const [page, setPage] = useState(0);
  //Состояние загрузки
  const [loading, setLoading] = useState(false);
  //Сколько данных можем загрузить
  const [totalPages, setTotalPages] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);

  //Срабатывает при запуске страницы для получения данных
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const update = () => {
      setData([]);
      fetchData();
    }
    SearchProp.subscribe(update)

    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
    };

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  //Получение данных из апи
  const fetchData = () => {
    if (loading) return;
    setLoading(true);

    // Вызываем функцию GetPollList с номером страницы
    GetPollList(page)
      .then(responseJson => {
        setData(prevData => [...prevData, ...responseJson.items]);
        // Общее количество контента
        setTotalPages(responseJson.totalCount);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  //Увеличение номера станицы для динамической пагинации
  const handleLoadMore = () => {
    if (data.length < totalPages) {
      setPage(page + 1);
    }
  };

  //Анимация загрузки данных
  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  //Перейти на страницу с информацией по опросу
  const goToPollInfo = (item) => {
    navigation.navigate("PollInfo", item)
  }

  return (
    <View style={[PollPageStyle.container, {backgroundColor}]}>
      <View>
        <Headder navigation={navigation}/>
      </View>
      <View style={[PollPageStyle.container, {backgroundColor}]}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={PollPageStyle.pollList}
          renderItem={({ item }) => <ShortPollCard item={item} onClick={goToPollInfo}/>}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
};