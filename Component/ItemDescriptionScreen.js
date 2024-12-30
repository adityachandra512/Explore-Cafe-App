import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function ItemDescriptionScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  const descriptions = {
    salad: "A fresh Mediterranean Chickpea Salad packed with protein and flavor. Perfect for a quick and healthy meal.",
    pasta: "A creamy and delicious Italian pasta with a touch of basil and parmesan. A crowd favorite!",
    dessert: "Indulge in this rich and decadent chocolate dessert. A treat for any sweet tooth!",
  };

  const itemDescription = descriptions[item.type] || "This is a delicious dish made with fresh ingredients, perfect for any occasion.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemDescription}>{itemDescription}</Text>
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryTimeLabel}>Delivery Time</Text>
          <Text style={styles.deliveryTime}>30 min</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    alignItems: 'center',
    padding: 20,
  },
  itemImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 20,
    marginTop: 50,
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 24,
    color: '#f4a261',
    marginBottom: 20,
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  deliveryInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  deliveryTimeLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4a261',
  },
  backButton: {
    paddingVertical: 15,
    backgroundColor: '#f4a261',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemDescriptionScreen;
