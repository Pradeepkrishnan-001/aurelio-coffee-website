
import { useState } from "react";
import { coffeeData } from "../coffeeData";
import "./checkout.css";

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
}

interface DiscountInfo {
    discount: number;
    couponCode: string;
}

interface CheckoutProps {
    cart: { id: number; quantity: number }[];
    onConfirmOrder: (
        customer: Customer,
        discountInfo: DiscountInfo
    ) => void;
}

function Checkout({ cart, onConfirmOrder }: CheckoutProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");

    const total = cart.reduce((sum, item) => {
        const coffee = coffeeData.find(c => c.id === item.id);
        return sum + (coffee ? coffee.price * item.quantity : 0);
    }, 0);

    const applyCoupon = () => {
        const code = couponCode.trim().toUpperCase();

        const coupons: { [key: string]: number | "fixed" } = {
            AURELIO10: 10,
            WELCOME15: 15,
            COFFEE5: "fixed"
        };

        if (cart.length === 0) {
            setCouponMessage("Your cart is empty.");
            return;
        }

        if (!coupons[code]) {
            setDiscount(0);
            setAppliedCoupon("");
            setCouponMessage("Invalid coupon code.");
            return;
        }

        if (code === "COFFEE5" && total < 5) {
            setDiscount(0);
            setAppliedCoupon("");
            setCouponMessage("Minimum order amount is €5.");
            return;
        }

        const discountAmount =
            coupons[code] === "fixed"
                ? 5
                : total * (coupons[code] as number) / 100;

        setDiscount(discountAmount);
        setAppliedCoupon(code);
        setCouponMessage("Coupon applied successfully!");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onConfirmOrder(
            {
                name,
                email,
                phone,
                address,
                city,
                postalCode
            },
            {
                discount,
                couponCode: appliedCoupon
            }
        );
    };

    return (
        <section className="checkout-page">
            <div className="checkout-heading">
                <p>AURELIO · ITALIAN COFFEE EXPERIENCE</p>
                <h1>Complete Your Order</h1>
                <span>Almost there. Your coffee awaits.</span>
            </div>

            <div className="checkout-container">

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Delivery Information</h2>

                    <label>Full Name</label>
                    <input
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your full name"
                    />

                    <label>Email Address</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    <label>Phone Number</label>
                    <input
                        required
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                    />

                    <label>Delivery Address</label>
                    <textarea
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="House number, street, area"
                    />

                    <div className="checkout-row">
                        <div>
                            <label>City</label>
                            <input
                                required
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>

                        <div>
                            <label>Postal Code</label>
                            <input
                                required
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)}
                                placeholder="Postal code"
                            />
                        </div>
                    </div>

                    <button type="submit" className="confirm-order">
                        CONFIRM ORDER
                    </button>
                </form>

                <div className="checkout-summary">
                    <h2>Your Order</h2>

                    <div className="coupon-section">
                        <h3>Have a Promo Code?</h3>

                        <div className="coupon-input">
                            <input
                                value={couponCode}
                                onChange={e => {
                                    setCouponCode(e.target.value);
                                    setCouponMessage("");
                                }}
                                placeholder="Enter coupon code"
                                disabled={!!appliedCoupon}
                            />

                            {appliedCoupon ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDiscount(0);
                                        setAppliedCoupon("");
                                        setCouponCode("");
                                        setCouponMessage("Coupon removed.");
                                    }}
                                >
                                    REMOVE
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={applyCoupon}
                                >
                                    APPLY
                                </button>
                            )}
                        </div>

                        {couponMessage && (
                            <p className="coupon-message">
                                {couponMessage}
                            </p>
                        )}
                    </div>

                    {cart.map(item => {
                        const coffee = coffeeData.find(
                            c => c.id === item.id
                        );

                        if (!coffee) return null;

                        return (
                            <div className="checkout-item" key={item.id}>
                                <span>
                                    {coffee.name} × {item.quantity}
                                </span>

                                <span>
                                    €{(
                                        coffee.price * item.quantity
                                    ).toFixed(2)}
                                </span>
                            </div>
                        );
                    })}

                    {discount > 0 && (
                        <div className="checkout-item">
                            <span>Discount ({appliedCoupon})</span>
                            <span>-€{discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="checkout-total">
                        <span>Total Amount</span>
                        <strong>
                            €{Math.max(0, total - discount).toFixed(2)}
                        </strong>
                    </div>

                    <p className="checkout-note">
                        Thank you for choosing AURELIO.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Checkout;
