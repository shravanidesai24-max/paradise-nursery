import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "./Header";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // Calculate total number of plants
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Checkout button
  const checkout = () => {
    alert("Coming Soon!");
  };

  return (
    <>
      <Header />

      <main className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <Link to="/plants">
              <button>Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <h2>
                Total Plants: {totalItems}
              </h2>

              <h2>
                Total Cost: ${totalAmount.toFixed(2)}
              </h2>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => {
                const itemTotal =
                  item.price * item.quantity;

                return (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>

                      <p>
                        Unit Price: ${item.price}
                      </p>

                      <p>
                        Total: ${itemTotal.toFixed(2)}
                      </p>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(item.id)
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQuantity(item.id)
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="delete-button"
                        onClick={() =>
                          dispatch(
                            removeFromCart(item.id)
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-actions">
              <Link to="/plants">
                <button>
                  Continue Shopping
                </button>
              </Link>

              <button onClick={checkout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default CartItem;