<template>
  <div class="container">
    <header class="header">
      <h1>Checkout</h1>
    </header>

    <!-- Shipping Information Section -->
    <section class="section">
      <h2>Shipping Information</h2>
      <div class="form-group">
        <label for="shippingAddress">Shipping Address:</label>
        <input v-model="shippingAddress" type="text" id="shippingAddress" required />
      </div>
      <div class="form-group">
        <label for="city">City:</label>
        <input v-model="city" type="text" id="city" required />
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code:</label>
        <input v-model="postalCode" type="text" id="postalCode" required />
      </div>
      <div class="form-group">
        <label for="province">Province:</label>
        <input v-model="province" type="text" id="province" required />
      </div>
    </section>

    <!-- Payment Method Section -->
    <section class="section">
      <h2>Payment Method</h2>
      <div class="form-group payment-methods">
        <label>
          <input type="radio" v-model="paymentMethod" value="creditCard" />
          Credit Card
        </label>
        <label>
          <input type="radio" v-model="paymentMethod" value="debitCard" />
          Debit Card
        </label>
        <label>
          <input type="radio" v-model="paymentMethod" value="visa" />
          Visa
        </label>
        <label>
          <input type="radio" v-model="paymentMethod" value="masterCard" />
          MasterCard
        </label>
        <label>
          <input type="radio" v-model="paymentMethod" value="americanExpress" />
          American Express
        </label>
      </div>

      <div v-if="requiresCardDetails" class="form-group card-details">
        <label for="cardNumber">Card Number:</label>
        <input v-model="cardNumber" type="text" id="cardNumber" required />
        <label for="expiryDate">Expiry Date:</label>
        <input v-model="expiryDate" type="text" id="expiryDate" required />
        <label for="cvv">CVV:</label>
        <input v-model="cvv" type="text" id="cvv" required />
      </div>
    </section>

    <!-- Delivery Method Section -->
    <section class="section">
      <h2>Delivery Method</h2>
      <div class="form-group delivery-methods">
        <label>
          <input type="checkbox" v-model="isShipping" @change="toggleDeliveryMethod('shipping')" />
          Shipping
        </label>
        <label>
          <input type="checkbox" v-model="isPickup" @change="toggleDeliveryMethod('pickup')" />
          Pick up order in store
        </label>
      </div>
    </section>

    <!-- Total Amount -->
    <div class="total">
      <strong>Total: ${{ total }}</strong>
    </div>

    <!-- Place Order and Back Buttons -->
    <div class="actions">
      <button @click="placeOrder" class="btn btn-primary">Place Order</button>
      <button @click="goBack" class="btn btn-secondary">Back</button>
    </div>

    <!-- Display success message -->
    <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
    <!-- Display error message -->
    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CheckoutPage',
  setup() {
    const shippingAddress = ref('');
    const city = ref('');
    const postalCode = ref('');
    const province = ref('');
    const paymentMethod = ref('');
    const cardNumber = ref('');
    const expiryDate = ref('');
    const cvv = ref('');
    const isShipping = ref(false);
    const isPickup = ref(false);
    const orderItems = ref([]);
    const total = ref(0);
    const errorMsg = ref('');
    const successMsg = ref('');

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getAll');
        const orders = response.data;
        if (orders.length > 0) {
          const order = orders[0]; // Assuming you want the first order for simplicity
          orderItems.value = order.items;
          total.value = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    const placeOrder = async () => {
      if (!isShipping.value && !isPickup.value) {
        errorMsg.value = 'Please select a delivery method.';
        return;
      }

      if (total.value > 0) {
        const orderData = {
          shippingAddress: shippingAddress.value,
          city: city.value,
          postalCode: postalCode.value,
          province: province.value,
          paymentMethod: paymentMethod.value,
          cardNumber: requiresCardDetails.value ? cardNumber.value : null,
          expiryDate: requiresCardDetails.value ? expiryDate.value : null,
          cvv: requiresCardDetails.value ? cvv.value : null,
          deliveryMethod: isShipping.value ? 'shipping' : 'pickup',
          items: orderItems.value,
          totalAmount: total.value,
        };

        try {
          // Print the data before sending
          console.log("Data being sent to API:", orderData);

          const response = await axios.post('http://localhost:8080/api/create', orderData);

          if (response.status === 200) {
            successMsg.value = 'Order placed successfully!';
            errorMsg.value = ''; // Clear any previous error message

            // Optionally, navigate to the order confirmation page
            setTimeout(() => {
              window.location.href = '/orderconfirmation';
            }, 1000);
          } else {
            throw new Error('Failed to place the order');
          }
        } catch (error) {
          errorMsg.value = 'Error placing the order.';
          successMsg.value = '';
          console.error('There was a problem with the order placement:', error);
        }
      } else {
        errorMsg.value = 'Your order is empty!';
      }
    };

    const goBack = () => {
      window.history.back();
    };

    const toggleDeliveryMethod = (method) => {
      if (method === 'shipping') {
        isPickup.value = false;
      } else if (method === 'pickup') {
        isShipping.value = false;
      }
    };

    const requiresCardDetails = computed(() =>
        ['creditCard', 'debitCard', 'visa', 'masterCard', 'americanExpress'].includes(paymentMethod.value)
    );

    onMounted(fetchOrderDetails);

    return {
      shippingAddress,
      city,
      postalCode,
      province,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      isShipping,
      isPickup,
      total,
      errorMsg,
      successMsg,
      placeOrder,
      goBack,
      toggleDeliveryMethod,
      requiresCardDetails,
    };
  },
};
</script>

<style scoped>
:root {
  --primary-color: rgba(6, 237, 23, 0.9);
  --danger-color: #dc3545;
  --secondary-color: #6c757d;
  --link-color: #17a2b8;
  --background-color: #f9f9f9;
  --text-color: #333;
  --font-family: 'Georgia', serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  background-image: url('https://wallpaperaccess.com/full/1880033.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

h1 {
  font-family: var(--font-family);
  color: #a8f4ff;
  position: relative;
  z-index: 1;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  font-family: var(--font-family);
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 10px;
}

.payment-methods label,
.delivery-methods label {
  display: block;
  margin-bottom: 5px;
}

.card-details {
  margin-top: 10px;
}

.total {
  font-size: 1.2em;
  font-weight: bold;
  margin: 20px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  color: #fff;
  text-align: center;
}

.btn-primary {
  background-color: var(--primary-color);
}

.btn-secondary {
  background-color: var(--secondary-color);
}

.success-msg {
  color: var(--primary-color);
  font-weight: bold;
}

.error-msg {
  color: var(--danger-color);
  font-weight: bold;
}
</style>
