import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation

export function CategoryItemsScreen({ route }) {
  const { category } = route.params;
  const { addToCart } = React.useContext(CartContext);
  const navigation = useNavigation(); // Initialize navigation hook

  const items = {
    Pizza: [
      { id: '101', name: 'Pepperoni Pizza', price: '$12', image: require('../assets/pepperoni.jpeg') },
      { id: '102', name: 'Veggie Pizza', price: '$10', image: require('../assets/veggie.jpeg') },
      { id: '103', name: 'Margherita Pizza', price: '$8', image: require('../assets/Pizza-Margherita.jpg') },
      { id: '104', name: 'The Sicilian Pizza', price: '$10', image: require('../assets/Sicilian-Pizza.jpg') },
      { id: '105', name: 'The Californian Pizza', price: '$13', image: require('../assets/Californian-Pizza.jpg') },
      { id: '106', name: 'French Bread', price: '$6', image: require('../assets/French-Bread-Pizza.jpg') },
      { id: '107', name: 'Chicken Tikka Masala', price: '$10', image: require('../assets/Chicken-Tikka-Masala-Pizza.jpg') },
    ],
    Burgers: [
      { id: '201', name: 'Cheeseburger', price: '$8', image: require('../assets/cheeseburger.jpeg') },
      { id: '202', name: 'Veggie Burger', price: '$7', image: require('../assets/veggieburger.jpg') },
      { id: '203', name: 'Bánh Mì Burger', price: '$7', image: require('../assets/Banh-Mi-Burger.jpg') },
      { id: '204', name: 'Beyond-Burger', price: '$7', image: require('../assets/Beyond-Burger.jpg') },
      { id: '205', name: 'Black Bean Burgers', price: '$7', image: require('../assets/Black-Bean-Burgers.jpg') },
      { id: '206', name: 'Chicken Burger', price: '$7', image: require('../assets/Chicken-Burger.jpg') },
    ],
    Desserts: [
      { id: '301', name: 'Chocolate Cake', price: '$6', image: require('../assets/cake.jpg') },
      { id: '302', name: 'Vanilla Ice Cream', price: '$5', image: require('../assets/vanila.jpg') },
      { id: '303', name: ' Apple Pie', price: '$5', image: require('../assets/apple-pie-ice-cream-625_625x350_81443595158.jpg') },
      { id: '304', name: 'Almond Malai Kulfi', price: '$5', image: require('../assets/almond-kulfi-625_625x350_61443596643.jpg') },
      { id: '305', name: 'Fudgy Chewy Brownies + ice cream', price: '$5', image: require('../assets/b0248411d7b2645a9f5392014fbee514.jpg') },
    ],
    'Main Course': [
      { id: '401', name: 'Butter chicken', price: '$12', image: require('../assets/butterchicken.jpeg') },
      { id: '402', name: 'Butter paneer', price: '$10', image: require('../assets/butterpaneer.jpg') },
      { id: '403', name: 'dal tadka', price: '$10', image: require('../assets/daltadka.jpeg') },
      { id: '404', name: 'dal makhani', price: '$10', image: require('../assets/dal makhni.jpeg') },
      { id: '405', name: 'panner tikka masala', price: '$10', image: require('../assets/paneertikka.jpg') },
      { id: '407', name: 'veg thali', price: '$10', image: require('../assets/himalayas-thali-veg.jpg') },
    ],
    Drinks: [
      { id: '501', name: 'Coca Cola', price: '$3', image: require('../assets/cococola.jpg') },
      { id: '502', name: 'Orange Juice', price: '$4', image: require('../assets/orange_juice.jpeg') },
      { id: '503', name: 'Mojito Mocktail', price: '$4', image: require('../assets/mojito-mocktail-14.jpg') },
      { id: '504', name: 'Kokum Sherbet', price: '$4', image: require('../assets/Solkadhi-drink.jpg') },
    ],
    Salad: [
      { id: '601', name: 'Caesar Salad', price: '$7', image: require('../assets/caesar_salad.jpg') },
      { id: '602', name: 'Greek Salad', price: '$6', image: require('../assets/greek_salad.jpg') },
      { id: '603', name: 'Gym salad (Low fat)', price: '$6', image: require('../assets/gym.jpeg') },
    ],
    Tacos: [
      { id: '701', name: 'Chicken Taco', price: '$5', image: require('../assets/chicken_taco.jpg') },
      { id: '702', name: 'Veg Taco', price: '$6', image: require('../assets/tacos.jpeg') },
      { id: '703', name: 'Crispy Potato Wrap Veg', price: '$6', image: require('../assets/1370x650__bob02-mexi_potato_roll.jpg') },
    ],
    Noodles: [
      { id: '801', name: 'Veg Noodles', price: '$12', image: require('../assets/vegnoodle.jpeg') },
      { id: '802', name: 'Paneer Noodles', price: '$15', image: require('../assets/paneer-noodle.jpeg') },
      { id: '803', name: 'Bean-r`Fried Noodles(special)', price: '$22', image: require('../assets/OIP.jpeg') },
      { id: '804', name: 'Manchurian-Noodles- Combo', price: '$15', image: require('../assets/Manchurian-Noodles-Combo.jpg') },
      { id: '805', name: 'Ramen', price: '$20', image: require('../assets/trending6.jpeg') },
    ],
    Momos: [
      { id: '901', name: 'Steamed Momos', price: '$7', image: require('../assets/steamed-momo.jpg') },
      { id: '902', name: 'Fried Momos', price: '$8', image: require('../assets/fried_momo.jpg') },
      { id: '903', name: 'Gravy Momos', price: '$8', image: require('../assets/eatj620u6xa.jpg') },
    ],
  };  

  const handleItemPress = (item) => {
    // Navigate to the item description page
    navigation.navigate('ItemDescription', { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={items[category]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleItemPress(item)} // Navigate to description
              >
                <Text style={styles.viewButtonText}>View Description</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export function ItemDescriptionScreen({ route }) {
  const { item } = route.params; // Get the item data from the navigation params
  const navigation = useNavigation(); // Initialize navigation hook

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.itemCard}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <Text style={styles.itemDescription}>{item.description || 'No description available.'}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:30 ,
    marginLeft: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#f4a261',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#333',
    
  },
  itemCard: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    elevation: 3,
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#f4a261',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#2a9d8f',
    padding: 10,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  itemDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});