// CharacterCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CharacterCard = ({ character, onPress }) => {
  const statusColor = {
    Alive: '#4caf50',    // Green
    Dead: '#f44336',     // Red
    unknown: '#9e9e9e',  // Gray
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <View
          style={[
            styles.statusLabel,
            {
              backgroundColor: statusColor[character.status] || '#ddd',
            },
          ]}
        >
          <Text style={styles.statusLabelText}>{character.status}</Text>
        </View>
      </View>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.location}>{character.location.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  statusLabel: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  statusLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  location: {
    fontSize: 12,
    color: 'gray',
  },
});

export default CharacterCard;
