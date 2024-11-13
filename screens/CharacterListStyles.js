import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  characterCard: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  characterStatus: {
    fontSize: 12,
    color: 'green',
    marginLeft: 'auto',
  },
  characterDetails: {
    fontSize: 12,
    color: 'gray',
  },
});

export default styles;
