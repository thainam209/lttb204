// screens/SearchResultsScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Dữ liệu giả lập cho kết quả tìm kiếm
const searchResults = [
  { id: '1', name: 'Egg Chicken Red', weight: '4pcs, Price', price: 1.99, image: require('../assets/images/egg-chicken-red.png') },
  { id: '2', name: 'Egg Chicken White', weight: '180g, Price', price: 1.50, image: require('../assets/images/egg-chicken-white.png') },
  { id: '3', name: 'Egg Pasta', weight: '30gm, Price', price: 15.99, image: require('../assets/images/egg-pasta.png') },
  { id: '4', name: 'Egg Noodles', weight: '2L, Price', price: 15.99, image: require('../assets/images/egg-noodles.png') },
  { id: '5', name: 'Mayonnaise Eggless', weight: '325ml, Price', price: 4.99, image: require('../assets/images/mayonnaise-eggless.png') },
  { id: '6', name: 'Egg Noodles', weight: '330ml, Price', price: 4.99, image: require('../assets/images/egg-noodles-2.png') },
];

const SearchResultsScreen = ({ route, navigation }) => {
  const { query } = route.params || {}; // Nhận từ khóa tìm kiếm từ tham số

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredResults = query
    ? searchResults.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : searchResults;

  const handleFilterPress = () => {
    // Điều hướng đến FilterScreen
    navigation.navigate('Filter');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemWeight}>{item.weight}</Text>
      {item.price > 0 && (
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      )}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={query || ''} // Hiển thị từ khóa tìm kiếm
          editable={false} // Tạm thời không cho chỉnh sửa
        />
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterIcon}>
          <Icon name="filter-list" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  filterIcon: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemWeight: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    color: '#181725',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#53B175',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  addButtonText: {
    margin: 5,
    color: '#fff',
    fontSize: 18,
  },
});

export default SearchResultsScreen;