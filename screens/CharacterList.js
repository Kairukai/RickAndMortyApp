import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import SearchBar from './SearchBar';
import Filter from './Filter';
import SortButton from './SortButton';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: '', species: '', status: '' });
  const [sorted, setSorted] = useState(false);

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

  const filteredCharacters = characters
    .filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender ? character.gender === filters.gender : true) &&
      (filters.species ? character.species === filters.species : true) &&
      (filters.status ? character.status === filters.status : true)
    )
    .sort((a, b) => sorted ? a.name.localeCompare(b.name) : 0);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filter setFilters={setFilters} />
      <SortButton setSorted={setSorted} />
      <View style={styles.cardContainer}>
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CharacterList;
