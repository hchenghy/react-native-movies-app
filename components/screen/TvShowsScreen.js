import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Dropdown from '../base/Dropdown';
import ItemCard from '../module/ItemCard';

const API_KEY = "7e9afa044cb916f24c14b8544c359849";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MoviesScreen = ({ navigation }) => {

  const subtypes = [
    { label: "Airing Today", value: "airing_today" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" }
  ]

  const [tvShows, setTVShows] = useState([]);
  const [subtype, setSubtype] = useState(subtypes[0].value);
  //   const navigation = useNavigation(); // Get navigation object using useNavigation hook

  useEffect(() => {
    fetchTvShows();
  }, [subtype]);

  const fetchTvShows = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${subtype}?api_key=${API_KEY}&language=en-US&page=1`);
      setTVShows(response.data.results);
    } catch (error) {
      console.error('Error fetching tv shows:', error);
    }
  };

  const onSubtypeValueChange = (item) => {
    setSubtype(item.value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          data={subtypes}
          selectedValue={subtype}
          onValueChange={onSubtypeValueChange} />
      </View>
      <FlatList
        style={styles.flatList}
        data={tvShows}
        renderItem={({ item }) => {
          return (<ItemCard
            id={item.id}
            path={`${IMAGE_BASE_URL}/${item.poster_path}`}
            title={item.name}
            popularity={item.popularity}
            releaseDate={item.release_date}
            onPress={() => navigation.navigate('Detail', { id: item.id, type: "tv" })}
          />
          )
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  dropdownContainer: {
    paddingHorizontal: 70,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default MoviesScreen;
