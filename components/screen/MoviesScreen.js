import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import Dropdown from '../base/Dropdown';
import ItemCard from '../module/ItemCard';

const API_KEY = "7e9afa044cb916f24c14b8544c359849";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MoviesScreen = ({ navigation }) => {

  const subtypes = [
    {label: "Now Playing", value: "now_playing"},
    {label: "Pouplar", value: "popular"},
    {label: "Top Rated", value: "top_rated"},
    {label: "Upcoming", value: "upcoming"}
  ]

  const [movies, setMovies] = useState([]);
  const [subtype, setSubtype] = useState(subtypes[0].value);
//   const navigation = useNavigation(); // Get navigation object using useNavigation hook

  useEffect(() => {
    fetchMovies();
  }, [subtype]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${subtype}?api_key=${API_KEY}&language=en-US&page=1`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const onSubtypeValueChange = (item) => {
    setSubtype(item.value)
  }

  return (
    <View>
      <Dropdown
        data={subtypes}
        selectedValue={subtype}
        onValueChange={onSubtypeValueChange} />
     
      <FlatList
        data={movies}
        renderItem={({ item }) => {
        return (<ItemCard
        id={item.id}
        path={`${IMAGE_BASE_URL}/${item.poster_path}`}
        title={item.title}
        popularity={item.popularity}
        releaseDate={item.release_date}
        onPress={() => navigation.navigate('Detail', { id: item.id,type: "movie" })}
        />
        )}}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MoviesScreen;
