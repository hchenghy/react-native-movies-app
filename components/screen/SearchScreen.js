import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import Dropdown from '../base/Dropdown';
import ItemCard from '../module/ItemCard';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SearchScreen = ({ navigation }) => {
  const searchTypes = [
    {label: "Multi", value: "multi"},
    {label: "Movie", value: "movie"},
    {label: "Tv", value: "tv"}
  ]

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(searchTypes[0].value);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY="7e9afa044cb916f24c14b8544c359849"

  const onInputChange = (value) => {
    setSearchTerm(value);
  }

  const onSearchTypeValueChange = (item) => {
    setSearchType(item.value)
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&query=${searchTerm}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Enter search term"
        onChangeText={onInputChange}
      />
      
      <Dropdown
        data={searchTypes}
        selectedValue={searchType}
        onValueChange={onSearchTypeValueChange} />

      <Button title="Search" onPress={handleSearch} />
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <FlatList
        data={searchResults}
        renderItem={({ item }) => {
        return (<ItemCard
        id={item.id}
        path={`${IMAGE_BASE_URL}/${item.poster_path}`}
        title={item.title || item.name}
        popularity={item.popularity}
        releaseDate={item.release_date}
        onPress={() => navigation.navigate('Detail', { id: item.id, type: item.title ? "movie" : "tv" })}
        />
        )}}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SearchScreen;
