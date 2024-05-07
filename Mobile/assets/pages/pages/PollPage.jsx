import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
} from "react-native";

import GetPollList from "../../APIConnection/GetPollList"

import {ShortPollCard} from "../../elements/specialElements/ShortPollCard"

import {PollPageStyle} from "../style/PollPageStyle"

export const PollPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  //Срабатывает при запуске страницы для получения данных
  useEffect(() => {
    fetchData();
  }, []);

  //Получение данных из апи
  const fetchData = () => {
    if (loading) return;

    setLoading(true);

    // Вызываем вашу функцию GetPollList с номером страницы
    GetPollList(page)
      .then(responseJson => {
        setData(prevData => [...prevData, ...responseJson]);
        console.log(responseJson)
        // Предполагая, что вам также возвращается общее количество страниц
        setTotalPages(responseJson.totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  //Индикатор загрузки данных
  const renderFooter = () => {
    return loading ? (
      <View style={{ paddingVertical: 20, width: "100%" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  //Увеличение номера станицы для динамической пагинации
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchData();
    }
  };

  return (
    <View style={PollPageStyle.container}>
      <FlatList 
        contentContainerStyle={PollPageStyle.pollList}
        data={data}
        renderItem={({ item }) => <ShortPollCard item={item}/>}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
    
  );
};