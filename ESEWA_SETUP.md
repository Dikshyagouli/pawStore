# eSewa Payment Integration Setup

## Backend Configuration

Add these environment variables to your `backend/.env` file:

```env
# eSewa Configuration
ESEWA_MERCHANT_CODE=EPAYTEST  # Use your actual merchant code in production
ESEWA_SECRET=your_esewa_secret_key  # Your eSewa secret key
ESEWA_URL=https://uat.esewa.com.np/epay/main  # For testing
# For production use: https://esewa.com.np/epay/main

# Application URLs
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

## eSewa Testing Credentials

For **UAT (Testing) Environment**:
- Use `EPAYTEST` as merchant code
- Test with eSewa test credentials
- URL: `https://uat.esewa.com.np/epay/main`

For **Production**:
- Use your actual merchant code from eSewa
- Use production URL: `https://esewa.com.np/epay/main`
- Ensure you have proper SSL certificate

## Payment Flow

1. User clicks "Proceed to Checkout" in cart
2. User fills shipping information
3. User selects "eSewa" as payment method
4. System creates order and generates eSewa payment form
5. User is redirected to eSewa payment page
6. After payment, eSewa redirects to `/api/orders/esewa-verify`
7. Backend verifies payment and updates order status
8. User is redirected to success/failure page

## Features

- ✅ eSewa online payment integration
- ✅ Cash on Delivery (COD) option
- ✅ Order creation and management
- ✅ Payment verification
- ✅ Cart clearing after successful payment
- ✅ Order tracking
- ✅ Payment success/failure pages

## Testing

1. Make sure backend server is running on port 5000
2. Make sure frontend is running
3. Add items to cart
4. Go to checkout
5. Select eSewa payment
6. Use eSewa test credentials to complete payment

## Notes

- The eSewa integration uses form submission method
- Payment verification happens via callback URL
- Orders are stored in MongoDB
- Cart is automatically cleared after successful payment
- Order status can be tracked in user profile

