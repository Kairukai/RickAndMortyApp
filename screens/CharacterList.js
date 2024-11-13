import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SearchBar from './SearchBar';
import Filter from './Filter';
import SortButton from './SortButton';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: '', species: '', status: '' });
  const [sorted, setSorted] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = () => {
    if (!hasMore) return;

    setLoading(page === 1);
    setLoadingMore(page > 1);

    axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => {
        setCharacters(prevCharacters => [
          ...prevCharacters,
          ...response.data.results
        ]);
        setHasMore(response.data.info.next !== null); // Check if there is another page
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setLoadingMore(false);
      });
  };

  const loadMoreCharacters = () => {
    if (!loadingMore && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const filteredCharacters = characters
    .filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender ? character.gender === filters.gender : true) &&
      (filters.species ? character.species === filters.species : true) &&
      (filters.status ? character.status === filters.status : true)
    )
    .sort((a, b) => sorted ? a.name.localeCompare(b.name) : 0);

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filter setFilters={setFilters} />
      <SortButton setSorted={setSorted} />
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CharacterCard character={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreCharacters} // Trigger loading more on reaching end of list
        onEndReachedThreshold={0.5} // Load more when user is halfway through the list
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    justifyContent: 'space-between',
  },
});

export default CharacterList;
