import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TextInput } from 'react-native';
import axios from 'axios';
import styles from './CharacterListStyles';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchCharacters();
  }, []);
  
  const fetchCharacters = () => {
    setLoading(true);
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };
  
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a character..."
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterCard}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{item.name}</Text>
            <Text style={styles.characterStatus}>{item.status}</Text>
            <Text style={styles.characterDetails}>{item.species} - {item.gender}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CharacterList;
