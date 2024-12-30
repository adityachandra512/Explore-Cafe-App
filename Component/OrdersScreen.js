import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { CartContext } from './CartContext';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export function OrdersScreen() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, confirmOrder } = React.useContext(CartContext);
  const [showBilling, setShowBilling] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit-card',
  });

  const navigation = useNavigation(); // Use this hook to access navigation

  const handleBillingInput = (field, value) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmOrder = () => {
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.address || 
        !billingInfo.city || !billingInfo.postalCode || !billingInfo.country) {
      Alert.alert('Error', 'Please fill in all billing information');
      return;
    }

    try {
      confirmOrder(billingInfo);
      const orderNumber = `ORD${Math.random().toString(36).substring(7).toUpperCase()}`;
      setOrderDetails({
        orderNumber,
        date: new Date().toLocaleDateString(),
        items: cart,
        total: getTotalPrice(),
        billing: billingInfo
      });
      setShowOrderSummary(true);
      setShowBilling(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Memoized component for order item to avoid unnecessary re-renders
  const OrderItem = React.memo(({ item }) => (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.orderItemImage} resizeMode="contain" />
      <View style={styles.orderItemInfo}>
        <Text style={styles.orderItemName}>{item.name}</Text>
        <Text style={styles.orderItemPrice}>{item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  ));

  const OrderSummaryScreen = () => (
    <ScrollView style={styles.billingContainer}>
      <Text style={styles.billingTitle}>Order Summary</Text>
      
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Order Information</Text>
        <Text style={styles.summaryText}>Order Number: {orderDetails.orderNumber}</Text>
        <Text style={styles.summaryText}>Date: {orderDetails.date}</Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Items Ordered</Text>
        {orderDetails.items.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.summaryText}>{orderDetails.billing.fullName}</Text>
        <Text style={styles.summaryText}>{orderDetails.billing.address}</Text>
        <Text style={styles.summaryText}>
          {orderDetails.billing.city}, {orderDetails.billing.postalCode}
        </Text>
        <Text style={styles.summaryText}>{orderDetails.billing.country}</Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text style={styles.summaryText}>
          Method: {orderDetails.billing.paymentMethod.split('-').map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </Text>
        <Text style={styles.totalText}>Total Amount: ${orderDetails.total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          setBillingInfo({
            fullName: '',
            email: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            paymentMethod: 'credit-card',
          });
          setShowOrderSummary(false);
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.confirmButtonText}>Back to Shopping</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const BillingForm = () => (
    <ScrollView style={styles.billingContainer}>
      <Text style={styles.billingTitle}>Billing Information</Text>
      
      {/* Full Name */}
      <Text style={styles.inputLabel}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={billingInfo.fullName}
        onChangeText={(value) => handleBillingInput('fullName', value)}
      />
      
      {/* Email */}
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={billingInfo.email}
        onChangeText={(value) => handleBillingInput('email', value)}
      />
      
      {/* Address */}
      <Text style={styles.inputLabel}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={billingInfo.address}
        onChangeText={(value) => handleBillingInput('address', value)}
      />
      
      {/* City */}
      <Text style={styles.inputLabel}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        value={billingInfo.city}
        onChangeText={(value) => handleBillingInput('city', value)}
      />
      
      {/* Postal Code */}
      <Text style={styles.inputLabel}>Postal Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your postal code"
        value={billingInfo.postalCode}
        onChangeText={(value) => handleBillingInput('postalCode', value)}
      />
      
      {/* Country */}
      <Text style={styles.inputLabel}>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your country"
        value={billingInfo.country}
        onChangeText={(value) => handleBillingInput('country', value)}
      />
      
      {/* Payment Method */}
      <Text style={styles.inputLabel}>Payment Method</Text>
      <Picker
        selectedValue={billingInfo.paymentMethod}
        style={styles.picker}
        onValueChange={(itemValue) => handleBillingInput('paymentMethod', itemValue)}
      >
        <Picker.Item label="Credit Card" value="credit-card" />
        <Picker.Item label="Debit Card" value="debit-card" />
        <Picker.Item label="PayPal" value="paypal" />
        <Picker.Item label="Bank Transfer" value="bank-transfer" />
      </Picker>
      
      {/* Confirm Order Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmOrder}
      >
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  if (cart.length === 0 && !showOrderSummary) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showOrderSummary ? (
        <OrderSummaryScreen />
      ) : showBilling ? (
        <BillingForm />
      ) : (
        <ScrollView style={styles.container}>
          <FlatList
            data={cart}
            renderItem={({ item }) => <OrderItem item={item} />}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => (
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${getTotalPrice().toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.proceedButton}
                  onPress={() => setShowBilling(true)}
                >
                  <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'gray',
  },
  orderItem: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  orderItemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  removeButtonText: {
    fontSize: 18,
    color: 'red',
  },
  totalContainer: {
    padding: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  billingContainer: {
    padding: 20,
  },
  billingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
