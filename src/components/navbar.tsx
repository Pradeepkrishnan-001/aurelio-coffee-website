
import { useState } from "react";
import { createPortal } from "react-dom";
import {
    Search,
    Heart,
    UserRound,
    X,
    ShoppingBag,
    Menu
} from "lucide-react";

import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";

function Navbar({
    search,
    setSearch,
    cartCount,
    wishlistCount
}: {
    search: string;
    setSearch: (value: string) => void;
    cartCount: number;
    wishlistCount: number;
}) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">

                {/* LOGO */}
                <Link
                    to="/"
                    className="logo"
                    onClick={closeMobileMenu}
                >
                    AURELIO
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/visit">Visit Us</Link>
                </div>

                {/* NAVBAR ACTIONS */}
                <div className="navbar-actions">

                    {/* SEARCH */}
                    <div className={`search-box ${searchOpen ? "active" : ""}`}>

                        {searchOpen && (
                            <input
                                type="text"
                                placeholder="Search For Coffee"
                                autoFocus
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" &&
                                        search.trim()
                                    ) {
                                        navigate("/search");
                                        setSearchOpen(false);
                                        closeMobileMenu();
                                    }
                                }}
                            />
                        )}

                        <button
                            className="icon-button"
                            onClick={() => {
                                setSearchOpen(!searchOpen);
                                closeMobileMenu();
                            }}
                            aria-label="Search"
                        >
                            {searchOpen ? (
                                <X size={20} />
                            ) : (
                                <Search size={20} />
                            )}
                        </button>
                    </div>

                    {/* WISHLIST */}
                    <button
                        className="icon-button"
                        aria-label="Wishlist"
                        onClick={() => {
                            closeMobileMenu();
                            navigate("/wishlist");
                        }}
                    >
                        <Heart size={20} />
                        <span className="cart-count">
                            {wishlistCount}
                        </span>
                    </button>

                    {/* LOGIN */}
                    <button
                        className="icon-button"
                        aria-label="Login"
                        onClick={() => {
                            setLoginOpen(true);
                            setIsSignUp(false);
                            closeMobileMenu();
                        }}
                    >
                        <UserRound size={20} />
                    </button>

                    {/* CART */}
                    <button
                        className="icon-button cart-button"
                        aria-label="Shopping Cart"
                        onClick={() => {
                            closeMobileMenu();
                            navigate("/cart");
                        }}
                    >
                        <ShoppingBag size={20} />
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    </button>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="mobile-menu-button"
                        onClick={() =>
                            setMobileMenuOpen(!mobileMenuOpen)
                        }
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <X size={23} />
                        ) : (
                            <Menu size={23} />
                        )}
                    </button>

                </div>
            </nav>

            {/* MOBILE NAVIGATION - RENDERED OUTSIDE NAVBAR */}
            {mobileMenuOpen &&
                createPortal(
                    <div className="mobile-nav-links">

                        <Link to="/" onClick={closeMobileMenu}>
                            Home
                        </Link>

                        <Link to="/menu" onClick={closeMobileMenu}>
                            Menu
                        </Link>

                        <Link to="/orders" onClick={closeMobileMenu}>
                            Orders
                        </Link>

                        <Link to="/visit" onClick={closeMobileMenu}>
                            Visit Us
                        </Link>

                    </div>,
                    document.body
                )
            }

            {/* LOGIN / SIGNUP POPUP */}
            {loginOpen && (
                <div
                    className="login-overlay"
                    onClick={() => setLoginOpen(false)}
                >
                    <div
                        className="login-popup"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <button
                            className="login-close"
                            onClick={() => setLoginOpen(false)}
                            aria-label="Close login"
                        >
                            <X size={20} />
                        </button>

                        <h2>
                            {isSignUp
                                ? "Create Your Account"
                                : "Welcome to AURELIO"}
                        </h2>

                        <p>
                            {isSignUp
                                ? "Join the AURELIO experience"
                                : "Sign in to your account"}
                        </p>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                alert("Login button is working!");
                            }}
                        >

                            {isSignUp && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                />
                            )}

                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                            />

                            <div className="password-box">

                                <input
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    placeholder="Password"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                            <button
                                type="submit"
                                className="login-submit"
                            >
                                {isSignUp
                                    ? "Create Account"
                                    : "Login"}
                            </button>

                        </form>

                        <p className="signup-text">
                            {isSignUp
                                ? "Already have an account?"
                                : "Don't have an account?"}

                            <span
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setShowPassword(false);
                                }}
                            >
                                {isSignUp ? " Login" : " Sign Up"}
                            </span>
                        </p>

                    </div>
                </div>
            )}

        </>
    );
}

export default Navbar;
