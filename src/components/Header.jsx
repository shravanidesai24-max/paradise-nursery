import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="logo">
        🌿 Paradise Nursery
      </div>

      <nav>
        <Link to="/">Home</Link>

        <Link to="/plants">Plants</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-count">
            {totalItems}
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;