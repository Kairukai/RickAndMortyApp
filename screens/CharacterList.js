import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SearchBar from './SearchBar';
import Filter from './Filter';
import SortButton from './SortButton';
import CharacterCard from './CharacterCard';
import PaginationControls from './PaginationControls';

const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [displayCharacters, setDisplayCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: '', species: '', status: '' });
  const [sorted, setSorted] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, filters, sorted, page, allCharacters]);


  const fetchAllCharacters = async () => {
    setLoading(true);
    let allData = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        allData = [...allData, ...response.data.results];
        totalPages = response.data.info.pages;
        currentPage += 1;
      }
      setAllCharacters(allData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = allCharacters
      .filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.gender ? character.gender === filters.gender : true) &&
        (filters.species ? character.species === filters.species : true) &&
        (filters.status ? character.status === filters.status : true)
      )
      .sort((a, b) => (sorted ? a.name.localeCompare(b.name) : 0));

    // Pagination logic
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayCharacters(filtered.slice(startIndex, endIndex));
  };

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filter setFilters={setFilters} />
      <SortButton setSorted={setSorted} />
      <FlatList
        data={displayCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CharacterCard character={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil(allCharacters.length / itemsPerPage)}
        onPageChange={setPage}
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
