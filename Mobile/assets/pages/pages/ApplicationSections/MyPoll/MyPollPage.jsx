import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from "react-native";

import GetMyCreatePollList from "../../../../APIConnection/GetMyCreatePollList"

import { SearchProp } from '../../../../Data/SearchProp';

import {Headder} from "../../../../elements/specialElements/Headder"
import {ShortPollCard} from "../../../../elements/specialElements/ShortPollCard"

import {PollPageStyle} from "../../../style/PollPageStyle"

export const MyPollPage = ({navigation}) => {
  //Данные
  const [myPollData, setMyPollData] = useState([]); 
  //Страница
  const [page, setPage] = useState(0);
  //Состояние загрузки
  const [loading, setLoading] = useState(false);
  //Сколько данных можем загрузить
  const [totalPages, setTotalPages] = useState(null);

  //Срабатывает при запуске страницы для получения данных
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const update = () => {
      setMyPollData([]);
      fetchData();
    }
    SearchProp.subscribe(update)
  }, []);

  //Получение данных из апи
  const fetchData = () => {
    if (loading) return;
    setLoading(true);

    // Вызываем функцию GetMyCreatePollList с номером страницы
    GetMyCreatePollList(page)
      .then(responseJSON => {
        console.log("data")
        console.log(responseJSON)
        setMyPollData(prevData => [...prevData, ...responseJSON.items]);
        setLoading(false);
      })
  };

  //Увеличение номера станицы для динамической пагинации
  const handleLoadMore = () => {
    if (myPollData.length < totalPages) {
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
    <View style={PollPageStyle.container}>
      <View>
        <Headder />
      </View>
      <View style={PollPageStyle.container}>
        <FlatList
          data={myPollData}
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
