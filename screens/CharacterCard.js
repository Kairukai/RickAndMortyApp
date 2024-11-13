import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterCard = ({ character }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={[styles.status, { color: getStatusColor(character.status) }]}>
        {character.status}
      </Text>
      <Text style={styles.details}>{character.species} - {character.gender}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CharacterCard;
