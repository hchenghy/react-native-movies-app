import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = "7e9afa044cb916f24c14b8544c359849";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const DetailScreen = ({ route, navigation }) => {
    const { id, type } = route.params;
    const [ result, setResult ] = useState(null);

    useEffect(() => {
        getById();
    }, []);

    const getById = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`);
            const data = response.data;
            setResult(data);
            const headerTitle = data.title || data.name;
            navigation.setOptions({headerTitle: headerTitle});
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    
    return (
        result && 
        <View style={styles.container}>
          <Image source={{ uri: `${IMAGE_BASE_URL}/${result.poster_path}` }} style={styles.image} />
          {result.title && <Text style={styles.title}>{result.title}</Text>}
          {result.name && <Text style={styles.title}>{result.name}</Text>}
          <Text style={styles.description}>{result.description}</Text>
          <Text>{result.overview}</Text>
          <Text>Popularity: {result.popularity}</Text>
          <Text>Release Date: {result.release_date}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
});


export default DetailScreen;