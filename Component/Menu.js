import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { CartContext } from './CartContext'; // Ensure the path is correct

// Dummy data for categories and items
const categories = [
  { id: '1', name: 'Pizza', image: require('../assets/pizza.jpg') },
  { id: '2', name: 'Burgers', image: require('../assets/trending1.jpeg') },
  { id: '3', name: 'Desserts', image: require('../assets/dessert.jpeg') },
  { id: '4', name: 'Main Course', image: require('../assets/main_course.jpg') },
  { id: '5', name: 'Drinks', image: require('../assets/drinks.jpg') },
  { id: '6', name: 'Salad', image: require('../assets/salad.jpeg') },
  { id: '7', name: 'Tacos', image: require('../assets/tacos.jpeg') },
  { id: '8', name: 'Noodles', image: require('../assets/vegnoodle.jpeg') },
  { id: '9', name: 'Momos', image: require('../assets/momo.png') },
];

const items = {
  Pizza: [
    { id: '101', name: 'Pepperoni Pizza', price: '$12', image: require('../assets/pepperoni.jpeg') },
    { id: '102', name: 'Veggie Pizza', price: '$10', image: require('../assets/veggie.jpeg') },
  ],
  Burgers: [
    { id: '201', name: 'Cheeseburger', price: '$8', image: require('../assets/cheeseburger.jpeg') },
    { id: '202', name: 'Veggie Burger', price: '$7', image: require('../assets/veggieburger.jpg') },
  ],
  Desserts: [
    { id: '301', name: 'Chocolate Cake', price: '$6', image: require('../assets/cake.jpg') },
    { id: '302', name: 'Vanilla Ice Cream', price: '$5', image: require('../assets/vanila.jpg') },
  ],
  'Main Course': [
    { id: '401', name: 'Butter chicken', price: '$12', image: require('../assets/butterchicken.jpeg') },
    { id: '402', name: 'Butter paneer', price: '$10', image: require('../assets/butterpaneer.jpg') },
    { id: '403', name: 'paneer butter masala', price: '$10', image: require('../assets/butterpaneer.jpg') },
    { id: '404', name: 'panner tikka masala', price: '$10', image: require('../assets/paneertikka.jpg') },
  ],
  Drinks: [
    { id: '501', name: 'Coca Cola', price: '$3', image: require('../assets/cococola.jpg') },
    { id: '502', name: 'Orange Juice', price: '$4', image: require('../assets/orange_juice.jpeg') },
  ],
  Salad: [
    { id: '601', name: 'Caesar Salad', price: '$7', image: require('../assets/caesar_salad.jpg') },
    { id: '602', name: 'Greek Salad', price: '$6', image: require('../assets/greek_salad.jpg') },
  ],
  Tacos: [
    { id: '701', name: 'Chicken Taco', price: '$5', image: require('../assets/chicken_taco.jpg') },
    { id: '702', name: 'Veg Taco', price: '$6', image: require('../assets/tacos.jpeg') },
  ],
  Noodles: [
    { id: '801', name: 'Veg Noodles', price: '$8', image: require('../assets/vegnoodle.jpeg') },
    { id: '802', name: 'Paneer Noodles', price: '$9', image: require('../assets/paneer-noodle.jpeg') },
  ],
  Momos: [
    { id: '901', name: 'Steamed Momos', price: '$7', image: require('../assets/steamed-momo.jpg') },
    { id: '902', name: 'Fried Momos', price: '$8', image: require('../assets/fried_momo.jpg') },
  ],
};

// MenuScreen Component
export function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('CategoryItems', { category: item.name })}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// CategoryItemsScreen Component
export function CategoryItemsScreen({ route }) {
  const { category } = route.params;
  const { addToCart, cart } = useContext(CartContext);

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const categoryItems = items[category] || [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={categoryItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const quantity = getItemQuantity(item.id);
          return (
            <View style={styles.itemCard}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                {quantity > 0 ? (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => addToCart({ ...item, quantity: Math.max(quantity - 1, 0) })}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart({ ...item, quantity: 1 })}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Lighter background for better contrast
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryCard: {
    marginBottom: 15,
    borderRadius: 12, // More rounded corners for a softer look
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 4, // Adding shadow for a more modern feel
    backgroundColor: '#fff', // Clean white background for the card
  },
  categoryImage: {
    width: '100%',
    height: 180, // Slightly larger image for better visibility
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryName: {
    fontSize: 20, // Larger font for category name
    fontWeight: '700', // More emphasis on the category name
    textAlign: 'center',
    paddingVertical: 12,
    color: '#333', // Darker text for better readability
  },
  title: {
    fontSize: 28, // Larger title size for emphasis
    fontWeight: '700',
    marginVertical: 15,
    textAlign: 'center',
    color: '#333',
  },
  itemCard: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15, // More rounded corners
    backgroundColor: '#fff', // Clean background
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3, // Adding subtle shadow to cards
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12, // Round edges for a more modern look
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18, // Slightly larger font for item names
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
    marginVertical: 8,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#ff5722', // More vibrant color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded button for better aesthetics
    alignSelf: 'flex-start',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600', // Bold text for better visibility
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#ff5722', // Consistent color for buttons
    width: 35,
    height: 35,
    borderRadius: 17.5, // Perfectly circular buttons
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 10,
  },
});

export default MenuScreen;
