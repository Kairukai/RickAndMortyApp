// PaginationControls.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    

    const addPageNumber = (page) => {
      pageNumbers.push(
        <TouchableOpacity
          key={page}
          style={[styles.pageButton, page === currentPage && styles.activePage]}
          onPress={() => onPageChange(page)}
        >
          <Text style={page === currentPage ? styles.activeText : styles.pageText}>
            {page}
          </Text>
        </TouchableOpacity>
      );
    };


    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        addPageNumber(i);
      }
    } else {

      addPageNumber(1);
      if (currentPage > 3) pageNumbers.push(<Text key="start-ellipsis">...</Text>);

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        addPageNumber(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push(<Text key="end-ellipsis">...</Text>);


      addPageNumber(totalPages - 1);
      addPageNumber(totalPages);
    }

    return pageNumbers;
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.disabled]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text>Prev</Text>
      </TouchableOpacity>

      {renderPageNumbers()}

      <TouchableOpacity
        style={[styles.pageButton, currentPage === totalPages && styles.disabled]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  activePage: {
    backgroundColor: '#007bff',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageText: {
    color: '#000',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default PaginationControls;
