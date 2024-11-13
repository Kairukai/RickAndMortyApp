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
  }, [page, searchTerm, filters, sorted]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      let results = response.data.results;

      results = results.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.gender ? character.gender === filters.gender : true) &&
        (filters.species ? character.species === filters.species : true) &&
        (filters.status ? character.status === filters.status : true)
      );

      if (sorted) {
        results = results.sort((a, b) => a.name.localeCompare(b.name));
      }

      setCharacters(results);
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

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filter setFilters={setFilters} />
      <SortButton setSorted={setSorted} />
      <FlatList
        data={characters}
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
                <Text style={styles.characterName}>{selectedCharacter.name}</Text>
                <Image source={{ uri: selectedCharacter.image }} style={styles.characterImage} />
                <View style={[styles.statusContainer, { backgroundColor: selectedCharacter.status === 'Alive' ? 'green' : selectedCharacter.status === 'Dead' ? 'red' : 'gray' }]}>
                  <Text style={styles.statusText}>{selectedCharacter.status}</Text>
                </View>
                <Text style={styles.characterDetail}><Text style={styles.boldText}>Gender:</Text> {selectedCharacter.gender}</Text>
                <Text style={styles.characterDetail}><Text style={styles.boldText}>Location:</Text> {selectedCharacter.location.name}</Text>
                <Text style={styles.characterDetail}><Text style={styles.boldText}>Origin:</Text> {selectedCharacter.origin.name}</Text>
                <Text style={styles.characterDetail}><Text style={styles.boldText}>Species:</Text> {selectedCharacter.species}</Text>
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
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  characterDetail: {
    fontSize: 14,
    marginVertical: 2,
    textAlign: 'left',
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default CharacterList;
