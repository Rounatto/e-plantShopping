import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // Calculate total cost for a single item
    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.substring(1)); // Remove $ and convert to number
        return cost * item.quantity;
    };

    // Calculate grand total for all items
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const cost = parseFloat(item.cost.substring(1));
            return total + (cost * item.quantity);
        }, 0);
    };

    // Calculate total number of items in cart
    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Increment quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    // Decrement quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item completely
    const handleRemove = (itemName) => {
        dispatch(removeItem(itemName));
    };

    // Checkout placeholder
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            
            {/* Cart Summary */}
            <div className="total_cart_amount">
                <p>Total Items: {calculateTotalItems()}</p>
                <p>Total Cost: ${calculateTotalAmount().toFixed(2)}</p>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-list">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            {/* Plant Image */}
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="cart-item-image" 
                            />
                            
                            {/* Plant Details */}
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cost">{item.cost} each</div>
                                
                                {/* Quantity Controls */}
                                <div className="cart-item-quantity">
                                    <button 
                                        className="cart-item-button"
                                        onClick={() => handleDecrement(item)}
                                    >
                                        -
                                    </button>
                                    <span className="cart-item-quantity-value">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        className="cart-item-button"
                                        onClick={() => handleIncrement(item)}
                                    >
                                        +
                                    </button>
                                </div>
                                
                                {/* Item Total */}
                                <div className="cart-item-total">
                                    Subtotal: ${calculateTotalCost(item).toFixed(2)}
                                </div>
                                
                                {/* Remove Button */}
                                <button 
                                    className="cart-item-delete"
                                    onClick={() => handleRemove(item.name)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Action Buttons */}
            <div className="continue_shopping_btn">
                <button 
                    onClick={onContinueShopping} 
                    className="get-started-button1"
                >
                    Continue Shopping
                </button>
                <button 
                    onClick={handleCheckoutShopping} 
                    className="get-started-button1"
                    style={{ marginLeft: '20px', backgroundColor: '#28a745' }}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;