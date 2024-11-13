import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Modal, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import SearchBar from './SearchBar';
import Filter from './Filter';
import SortButton from './SortButton';
import CharacterCard from './CharacterCard';
import PaginationControls from './PaginationControls';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: '', species: '', status: '' });
  const [sorted, setSorted] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
  };

  const filteredCharacters = characters
    .filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender ? character.gender === filters.gender : true) &&
      (filters.species ? character.species === filters.species : true) &&
      (filters.status ? character.status === filters.status : true)
    )
    .sort((a, b) => (sorted ? a.name.localeCompare(b.name) : 0));

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filter setFilters={setFilters} />
      <SortButton setSorted={setSorted} />
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard character={item} onPress={() => openModal(item)} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

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
