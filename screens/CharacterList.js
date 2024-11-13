import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Modal, Text, Image, TouchableOpacity, Button } from 'react-native';
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
  const [selectedCharacter, setSelectedCharacter] = useState(null); // State for selected character
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

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

  const openModal = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
  };

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filter setFilters={setFilters} />
      <SortButton setSorted={setSorted} />
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => openModal(item)} // Open modal on click
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreCharacters} // Trigger loading more on reaching end of list
        onEndReachedThreshold={0.5} // Load more when user is halfway through the list
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
      {/* Modal for Character Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {selectedCharacter && (
              <>
                <Text style={styles.detailTitle}>{selectedCharacter.name}</Text>
                <Image source={{ uri: selectedCharacter.image }} style={styles.detailImage} />
                <Text>Gender: {selectedCharacter.gender}</Text>
                <Text>Status: {selectedCharacter.status}</Text>
                <Text>Species: {selectedCharacter.species}</Text>
                <Text>Location: {selectedCharacter.location.name}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default CharacterList;
