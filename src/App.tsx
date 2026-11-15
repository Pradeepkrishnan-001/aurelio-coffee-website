
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/navbar";
import CoffeeMenu from "./components/CoffeeMenu";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SearchResults from "./components/searchresults";
import Cart from "./components/cart";
import Contact from "./components/Contact";
import Wishlist from "./components/wishlist";
import Orders from "./components/order";
import Checkout from "./components/Checkout";
import Story from "./components/story";
import { coffeeData } from "./coffeeData";
import VisitUs from "./components/VisitUs";
import FloatingCart from "./components/FloatingCart";

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
}

interface Order {
    id: string;
    date: string;
    items: {
        id: number;
        name: string;
        price: number;
        quantity: number;
    }[];
    subtotal: number;
    discount: number;
    couponCode: string;
    total: number;
    status: "Processing" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
    customer: Customer;
}

function App() {
    const navigate = useNavigate();
    const location = useLocation();

useEffect(() => {
    if (location.pathname === "/") {
        setSearch("");
    }
}, [location.pathname]);

    const [search, setSearch] = useState("");

    // Cart state
    const [cart, setCart] = useState<
        { id: number; quantity: number }[]
    >(() => {
        const savedCart = localStorage.getItem("aurelio-cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Wishlist state
    const [wishlist, setWishlist] = useState<number[]>(() => {
        const savedWishlist = localStorage.getItem("aurelio-wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Orders state
    const [orders, setOrders] = useState<Order[]>(() => {
        const savedOrders = localStorage.getItem("aurelio-orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Save cart
    useEffect(() => {
        localStorage.setItem("aurelio-cart", JSON.stringify(cart));
    }, [cart]);

    // Save wishlist
    useEffect(() => {
        localStorage.setItem("aurelio-wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // Save orders
    useEffect(() => {
        localStorage.setItem("aurelio-orders", JSON.stringify(orders));
    }, [orders]);

    // Wishlist
    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    // Add to cart
    const addToCart = (id: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === id
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { id, quantity: 1 }];
        });
    };

    // Cart count
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Remove item from cart
    const removeFromCart = (id: number) => {
        setCart((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    // Update cart quantity
    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;

        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Navigate to checkout
    const handlePlaceOrder = () => {
        if (cart.length === 0) return;
        navigate("/checkout");
    };

    // Confirm order
    const handleConfirmOrder = (
        customer: Customer,
        discountInfo: {
            discount: number;
            couponCode: string;
        }
    ) => {
        if (cart.length === 0) return;

        const orderItems = cart.map((item) => {
            const coffee = coffeeData.find(
                (c) => c.id === item.id
            );

            if (!coffee) {
                throw new Error("A cart product could not be found.");
            }

            return {
                id: item.id,
                name: coffee.name,
                price: coffee.price,
                quantity: item.quantity
            };
        });

        const subtotal = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const discount = Math.min(
            Math.max(0, discountInfo.discount),
            subtotal
        );

        const newOrder: Order = {
            id: "AUR" + Date.now(),
            date: new Date().toLocaleString(),
            items: orderItems,
            subtotal,
            discount,
            couponCode: discountInfo.couponCode,
            total: subtotal - discount,
            status: "Processing",
            customer
        };

        setOrders((prev) => [newOrder, ...prev]);
        setCart([]);

        alert("Your order has been confirmed!");
        navigate("/orders");
    };

    // Cancel order
    const handleCancelOrder = (id: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id
                    ? { ...order, status: "Cancelled" }
                    : order
            )
        );
    };

    // Update order status
    const handleUpdateOrderStatus = (
        id: string,
        status: Order["status"]
    ) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id
                    ? { ...order, status }
                    : order
            )
        );
    };

    return (
        <>
            {/* FLOATING SHOPPING CART */}
            <FloatingCart cartCount={cartCount} />

            <Routes>

                {/* HOME PAGE */}
                <Route
                    path="/"
                    element={
                        <div className="app">

                            <section className="hero" id="home">
                                <video
                                    className="hero-video"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source
                                        src="/Coffee%20Website%20mp4.mp4"
                                        type="video/mp4"
                                    />
                                </video>

                                <div className="hero-overlay"></div>

                                <Navbar
                                    search={search}
                                    setSearch={setSearch}
                                    cartCount={cartCount}
                                    wishlistCount={wishlist.length}
                                />

                                <div className="hero-content">
                                    <p className="hero-subtitle">
                                        AN ITALIAN COFFEE EXPERIENCE
                                    </p>

                                    <h1>
                                        A Moment Of<br />
                                        Pure Elegance.
                                    </h1>

                                    <p className="hero-description">
                                        Discover the art of exceptional coffee,
                                        <br />
                                        inspired by the heart of Italy.
                                    </p>

                                    <button
                                        className="hero-button"
                                        onClick={() => navigate("/story")}
                                    >
                                        EXPLORE OUR STORY
                                    </button>
                                </div>
                            </section>

                            <CoffeeMenu
                                search={search}
                                addToCart={addToCart}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                            />

                            <Contact />

                        </div>
                    }
                />

                {/* STORY PAGE */}
                <Route
                    path="/story"
                    element={
                        <Story
                            search={search}
                            setSearch={setSearch}
                            cartCount={cartCount}
                            wishlistCount={wishlist.length}
                        />
                    }
                />

                {/* VISIT US PAGE */}
                <Route
                    path="/visit"
                    element={
                        <VisitUs
                            search={search}
                            setSearch={setSearch}
                            cartCount={cartCount}
                            wishlistCount={wishlist.length}
                        />
                    }
                />

                {/* SEARCH PAGE */}
                <Route
                    path="/search"
                    element={
                        <SearchResults
                            search={search}
                            addToCart={addToCart}
                            wishlist={wishlist}
                            toggleWishlist={toggleWishlist}
                        />
                    }
                />

                {/* MENU PAGE */}
                <Route
                    path="/menu"
                    element={
                        <>
                            <Navbar
                                search={search}
                                setSearch={setSearch}
                                cartCount={cartCount}
                                wishlistCount={wishlist.length}
                            />

                            <CoffeeMenu
                                search=""
                                addToCart={addToCart}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                                showAll={true}
                            />
                        </>
                    }
                />

                {/* WISHLIST PAGE */}
                <Route
                    path="/wishlist"
                    element={
                        <>
                            <Navbar
                                search={search}
                                setSearch={setSearch}
                                cartCount={cartCount}
                                wishlistCount={wishlist.length}
                            />

                            <Wishlist
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                                addToCart={addToCart}
                            />
                        </>
                    }
                />

                {/* CART PAGE */}
                <Route
                    path="/cart"
                    element={
                        <>
                            <Navbar
                                search={search}
                                setSearch={setSearch}
                                cartCount={cartCount}
                                wishlistCount={wishlist.length}
                            />

                            <Cart
                                cart={cart}
                                removeFromCart={removeFromCart}
                                updateQuantity={updateQuantity}
                                onPlaceOrder={handlePlaceOrder}
                            />
                        </>
                    }
                />

                {/* CHECKOUT PAGE */}
                <Route
                    path="/checkout"
                    element={
                        <>
                            <Navbar
                                search={search}
                                setSearch={setSearch}
                                cartCount={cartCount}
                                wishlistCount={wishlist.length}
                            />

                            <Checkout
                                cart={cart}
                                onConfirmOrder={handleConfirmOrder}
                            />
                        </>
                    }
                />

                {/* ORDERS PAGE */}
                <Route
                    path="/orders"
                    element={
                        <>
                            <Navbar
                                search={search}
                                setSearch={setSearch}
                                cartCount={cartCount}
                                wishlistCount={wishlist.length}
                            />

                            <Orders
                                orders={orders}
                                cancelOrder={handleCancelOrder}
                                updateOrderStatus={handleUpdateOrderStatus}
                            />
                        </>
                    }
                />

            </Routes>
        </>
    );
}

export default App;
