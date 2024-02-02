import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Dropdown from '../base/Dropdown';
import ItemCard from '../module/ItemCard';
import Icon from 'react-native-vector-icons/FontAwesome';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SearchScreen = ({ navigation }) => {
  const searchTypes = [
    { label: "Multi", value: "multi" },
    { label: "Movie", value: "movie" },
    { label: "Tv", value: "tv" }
  ]

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(searchTypes[0].value);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonColor, setButtonColor] = useState("#09AECF");

  const API_KEY = "7e9afa044cb916f24c14b8544c359849"

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
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const onPressInButton = () => {
    setButtonColor("#076985");
  };

  const onPressOutButton = () => {
    setButtonColor("#09AECF");
    handleSearch();
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.label}>
          Search Movie/TV Show Name
          <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="search" size={20} color='grey' style={styles.searchIcon} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="i.e. James Bond"
            onChangeText={onInputChange}
            value={searchTerm}
          />
        </View>
        <Text style={styles.label}>
          Choose Search Type
          <Text style={{ color: 'red' }}>*</Text>
        </Text>

        <View style={styles.row}>

          <View style={styles.dropdownContainer}>
            <Dropdown
              data={searchTypes}
              selectedValue={searchType}
              onValueChange={onSearchTypeValueChange}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPressIn={onPressInButton}
            onPressOut={onPressOutButton}
            activeOpacity={1}>
            <View style={styles.buttonContent}>
              <Icon name="search" size={20} color="white" />
              <Text style={styles.buttonText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text>Please select a search type</Text>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {!searchResults.length && !searchTerm && <Text style={styles.searchPrompt}>Please initiate a search</Text>}
      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {
        !!searchResults.length && (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <ItemCard
                id={item.id}
                path={`${IMAGE_BASE_URL}/${item.poster_path}`}
                title={item.title || item.name}
                popularity={item.popularity}
                releaseDate={item.release_date}
                onPress={() => navigation.navigate('Detail', { id: item.id, type: item.title ? "movie" : "tv" })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  dropdownContainer: {
    flex: 1,
    marginBottom: 10,
  },

  label: {
    marginBottom: 5,
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E2',
    marginBottom: 10,
    borderRadius: 8,
  },

  iconContainer: {
    backgroundColor: '#E0E0E2',
    color: 'grey',
  },

  searchIcon: {
    color: 'grey',
  },

  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#E0E0E2'
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#09AECF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: 'white',
    marginLeft: 10,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },

  searchPrompt: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
    alignItems: 'center',
    fontWeight: 'bold',
  },

  searchIcon: {
    padding: 10,
  },
});

export default SearchScreen;
