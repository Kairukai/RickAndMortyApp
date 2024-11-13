import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  characterCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: (width / numColumns) - 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  characterStatus: {
    fontSize: 12,
    color: 'green',
  },
  characterDetails: {
    fontSize: 12,
    color: 'gray',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  paginationButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  paginationButtonText: {
    color: '#fff',
  },
});
