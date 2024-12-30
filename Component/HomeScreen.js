import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchNearbyRestaurants } from '../Component/restaurant';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]); // New state for nearby restaurants
  const windowWidth = Dimensions.get('window').width;

  const popularDishes = [
    { id: '1', name: 'Spaghetti Carbonara', image: require('../assets/OIP.jpeg'), price: '$12.99', rating: '4.5' },
    { id: '2', name: 'Margherita Pizza', image: require('../assets/pizza.jpg'), price: '$14.99', rating: '4.8' },
    { id: '3', name: 'Caesar Salad', image: require('../assets/salad.jpeg'), price: '$8.99', rating: '4.3' },
    { id: '4', name: 'Butterscotch Cake', image: require('../assets/cake.jpeg'), price: '$6.99', rating: '4.7' },
  ];

  const categories = [
    { name: 'Pizza', icon: 'local-pizza' },
    { name: 'Burger', icon: 'fastfood' },
    { name: 'Momos', icon: 'rice-bowl' },
    { name: 'Noodles', icon: 'ramen-dining' },
    { name: 'Tacos', icon: 'tapas' },
    { name: 'Salad', icon: 'emoji-food-beverage' },
    { name: 'Drinks', icon: 'local-drink' },
    { name: 'Desserts', icon: 'cake' },
    { name: 'Main Course', icon: 'dining' },
  ];

  useEffect(() => {
    // Filter dishes and categories when searchText changes
    const filteredDishesList = popularDishes.filter(dish =>
      dish.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDishes(filteredDishesList);

    const filteredCategoriesList = categories.filter(category =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategories(filteredCategoriesList);

    // Fetch nearby restaurants
    const nearbyRestaurants = fetchNearbyRestaurants();
    setRestaurants(nearbyRestaurants); // Update the state with fetched restaurants
  }, [searchText]);

  const renderDishItem = (item) => (
    <View key={item.id} style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.dishInfo}>
        <Text style={styles.carouselText}>{item.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCategoryItem = (item, index) => (
    <View key={index} style={styles.categoryCarouselItem}>
      <Icon name={item.icon} size={30} color="#ff6347" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  const renderRestaurantItem = (restaurant) => (
    <View key={restaurant.id} style={styles.restaurantItem}>
      <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.restaurantLocation}>{restaurant.address}</Text>
      <Text style={styles.restaurantStatus}>{restaurant.status}</Text>
      <Text style={styles.restaurantRating}>Rating: {restaurant.rating} ★</Text>
      <Text style={styles.restaurantReviews}>{restaurant.reviewsCount} Reviews</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search for meals or categories..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#aaa"
          />

          {/* Welcome Text */}
          <Text style={styles.title}>
            Welcome to <Text style={styles.highlight}>Explore Cafe!</Text>
          </Text>
          <Text style={styles.description}>
            Discover delicious meals and enjoy fast delivery.
          </Text>

          {/* Banner Image */}
          <Image
            source={require('../assets/signuplogo.png')}
            style={styles.banner}
            resizeMode="cover"
          />

          {/* Categories Section */}
          <Text style={styles.subheading}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContainer}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item, index) => renderCategoryItem(item, index))
            ) : (
              <Text>No categories found</Text>
            )}
          </ScrollView>

          {/* Popular Dishes Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.subheading}>Popular Dishes</Text>
            <TouchableOpacity>
              <Text style={styles.exploreMore}>Explore More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dishesScrollContainer}
          >
            {filteredDishes.length > 0 ? (
              filteredDishes.map(item => renderDishItem(item))
            ) : (
              <Text>No dishes found</Text>
            )}
          </ScrollView>
                        
              <View style={styles.sectionHeader}>
                <Text style={styles.subheading}>Featured Offers</Text>
                <TouchableOpacity>
                  <Text style={styles.exploreMore}>Explore More</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.dishesScrollContainer}
>
  <View style={styles.offerItem}>
    <Image source={require('../assets/1.jpg')} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>50% Off on Pizza</Text>
      <Text style={styles.offerPrice}>$7.99</Text>
      <Text style={styles.offerDescription}>Enjoy a delicious pizza with a 50% discount! Choose from our wide range of pizza options.</Text>
      <Text style={styles.offerDetails}>*Valid for a limited time only. T&Cs apply.</Text>
    </View>
  </View>

  <View style={styles.offerItem}>
    <Image source={require('../assets/OIP (2).jpeg')} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>Buy 1 Get 1 Free - Burgers</Text>
      <Text style={styles.offerPrice}>$9.99</Text>
      <Text style={styles.offerDescription}>Get two juicy burgers for the price of one! Perfect for sharing with a friend.</Text>
      <Text style={styles.offerDetails}>*Offer available on select burgers. Limited time only.</Text>
    </View>
  </View>

  {/* New Offer 1 */}
  <View style={styles.offerItem}>
    <Image source={require('../assets/trending3.jpeg')} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>Free Dessert with Any Main</Text>
      <Text style={styles.offerPrice}>$12.99</Text>
      <Text style={styles.offerDescription}>Buy any main dish and get a free dessert of your choice. Sweeten your meal!</Text>
      <Text style={styles.offerDetails}>*Terms apply. Available at select locations only.</Text>
    </View>
  </View>

  {/* New Offer 2 */}
  <View style={styles.offerItem}>
    <Image source={require('../assets/trending4.jpg')} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>Combo Deal - Pasta & Drink</Text>
      <Text style={styles.offerPrice}>$14.99</Text>
      <Text style={styles.offerDescription}>Enjoy a delicious pasta and a refreshing drink at a discounted price!</Text>
      <Text style={styles.offerDetails}>*Combo only available for dine-in.</Text>
    </View>
  </View>

  {/* New Offer 3 */}
  <View style={styles.offerItem}>
    <Image source={require('../assets/trending5.jpg')} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>Weekend Breakfast Special</Text>
      <Text style={styles.offerPrice}>$6.49</Text>
      <Text style={styles.offerDescription}>Start your weekend right with our special breakfast options at a great price.</Text>
      <Text style={styles.offerDetails}>*Only available on weekends from 8 AM to 11 AM.</Text>
    </View>
  </View>

  {/* New Offer 4 */}
  <View style={styles.offerItem}>
    <Image source={require('../assets/trending6.jpeg')} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>Happy Hour - 2 for 1 Drinks</Text>
      <Text style={styles.offerPrice}>$5.99</Text>
      <Text style={styles.offerDescription}>Enjoy 2 drinks for the price of 1 during Happy Hour! Cheers!</Text>
      <Text style={styles.offerDetails}>*Available from 5 PM to 7 PM every day.</Text>
    </View>
  </View>
</ScrollView>

          {/* Nearby Restaurants Section */}
          <Text style={styles.subheading}>Nearby Restaurants</Text>
          <View style={styles.restaurantsList}>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => renderRestaurantItem(restaurant))
            ) : (
              <Text>No restaurants found</Text>
            )}
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.subheading}>Trending Meals</Text>
            <TouchableOpacity>
              <Text style={styles.exploreMore}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dishesScrollContainer}
          >
            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending1.jpeg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Vegan Burger</Text>
                <Text style={styles.priceText}>$10.99</Text>
                <Text style={styles.dishDescription}>A delicious plant-based burger with fresh vegetables, avocado, and a smoky vegan patty.</Text>
              </View>
            </View>
            
            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending2.jpeg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Chicken Tacos</Text>
                <Text style={styles.priceText}>$12.99</Text>
                <Text style={styles.dishDescription}>Soft corn tortillas filled with seasoned chicken, salsa, guacamole, and a dash of lime.</Text>
              </View>
            </View>

            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending3.jpeg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Sushi Rolls</Text>
                <Text style={styles.priceText}>$14.99</Text>
                <Text style={styles.dishDescription}>Fresh sushi rolls made with tuna, salmon, cucumber, and a savory soy sauce dip.</Text>
              </View>
            </View>

            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending4.jpg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Grilled Chicken Salad</Text>
                <Text style={styles.priceText}>$11.99</Text>
                <Text style={styles.dishDescription}>Grilled chicken breast served on a bed of mixed greens, with a light vinaigrette dressing.</Text>
              </View>
            </View>

            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending5.jpg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Cheeseburger</Text>
                <Text style={styles.priceText}>$9.99</Text>
                <Text style={styles.dishDescription}>A classic cheeseburger with a juicy beef patty, melted cheese, lettuce, tomato, and pickles.</Text>
              </View>
            </View>

            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending6.jpeg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Spicy Ramen</Text>
                <Text style={styles.priceText}>$13.99</Text>
                <Text style={styles.dishDescription}>A flavorful and spicy ramen with a rich broth, noodles, and tender slices of pork.</Text>
              </View>
            </View>

            <View style={styles.carouselItem}>
              <Image source={require('../assets/trending7.jpeg')} style={styles.carouselImage} />
              <View style={styles.dishInfo}>
                <Text style={styles.carouselText}>Pasta Alfredo</Text>
                <Text style={styles.priceText}>$15.99</Text>
                <Text style={styles.dishDescription}>A creamy Alfredo pasta dish with parmesan cheese, garlic, and a hint of parsley.</Text>
              </View>
            </View>
          </ScrollView>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 24,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  highlight: {
    color: '#ff6347',
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  exploreMore: {
    fontSize: 14,
    color: '#ff6347',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  dishesScrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  carouselItem: {
    width: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dishInfo: {
    padding: 12,
  },
  carouselText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    color: '#ff6347',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: '600',
  },
  categoriesScrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryCarouselItem: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantsList: {
    width: '100%',
    marginTop: 20,
  },
  restaurantItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  restaurantStatus: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 5,
  },
  restaurantRating: {
    fontSize: 14,
    color: '#ffa500',
    marginTop: 5,
  },
  restaurantReviews: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  offerItem: {
    width: 250,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  offerImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  offerPrice: {
    fontSize: 14,
    color: '#ff6347',
    fontWeight: '600',
    marginTop: 5,
  },
  reviewsList: {
    width: '100%',
    marginVertical: 10,
  },
  reviewItem: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  reviewAuthor: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  specialsItem: {
    width: '100%',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  specialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  specialPrice: {
    fontSize: 16,
    color: '#ff6347',
    fontWeight: '600',
    marginTop: 5,
  },
  newsletterSection: {
    width: '100%',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  newsletterInput: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  newsletterButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  newsletterButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  dishesScrollContainer: {
    flexDirection: 'row', // Ensures the items are laid out horizontally
    paddingVertical: 10, // Adds some vertical padding around the ScrollView
  },
  offerItem: {
    backgroundColor: '#fff', // White background for each offer item
    marginHorizontal: 10, // Adds horizontal space between items
    width: 250, // Set a fixed width for each offer card
    borderRadius: 10, // Rounded corners for the offer cards
    shadowColor: '#000', // Shadow effect for the offer cards
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Adds shadow on Android
    overflow: 'hidden', // Ensures the image doesn't overflow the card border
  },
  offerImage: {
    width: '100%', // Full width of the card
    height: 150, // Set the height of the image
    borderTopLeftRadius: 10, // Rounded corners on the top-left
    borderTopRightRadius: 10, // Rounded corners on the top-right
  },
  offerInfo: {
    padding: 10, // Adds padding inside the offer info container
  },
  offerTitle: {
    fontSize: 16, // Title font size
    fontWeight: 'bold', // Bold font for the title
    color: '#333', // Dark color for the title
    marginBottom: 5, // Space below the title
  },
  offerPrice: {
    fontSize: 14, // Price font size
    color: '#e74c3c', // Red color for the price to make it stand out
    marginBottom: 5, // Space below the price
  },
  offerDescription: {
    fontSize: 12, // Smaller font for the description
    color: '#555', // Lighter color for the description
    marginBottom: 5, // Space below the description
  },
  offerDetails: {
    fontSize: 10, // Small font for the terms and conditions
    color: '',
    fontWeight: 'bold', // Light gray color for the terms
  },
});
