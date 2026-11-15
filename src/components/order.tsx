
import { useState } from "react";
import "./orders.css";

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
}

type OrderStatus =
    | "Processing"
    | "Preparing"
    | "Ready"
    | "Delivered"
    | "Cancelled";

interface Order {
    id: string;
    date: string;

    items: {
        id: number;
        name: string;
        price: number;
        quantity: number;
    }[];

    subtotal?: number;
    discount?: number;
    couponCode?: string;
    total: number;

    status: OrderStatus;
    customer: Customer;
}

interface OrdersProps {
    orders: Order[];
    cancelOrder: (id: string) => void;
    updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const trackingSteps: OrderStatus[] = [
    "Processing",
    "Preparing",
    "Ready",
    "Delivered"
];

const trackingLabels = [
    "Order Placed",
    "Preparing Your Coffee",
    "Ready for Delivery",
    "Delivered"
];

function Orders({
    orders,
    cancelOrder,
    updateOrderStatus
}: OrdersProps) {

    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const toggleDetails = (id: string) => {
        setExpandedOrder((prev) => prev === id ? null : id);
    };

    const getProgress = (status: OrderStatus) => {
        return trackingSteps.indexOf(status);
    };

    return (
        <section className="orders-page">

            <div className="orders-heading">
                <p>YOUR AURELIO EXPERIENCE</p>
                <h1>My Orders</h1>
                <span>Every cup tells a story.</span>
            </div>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <h2>No orders yet</h2>
                    <p>Your coffee journey starts here.</p>
                    <a href="/">Explore Our Menu</a>
                </div>
            ) : (
                <div className="orders-list">

                    {orders.map((order) => {

                        const status = order.status as OrderStatus;
                        const progress = getProgress(status);
                        const cancelled = status === "Cancelled";

                        // Support older orders without discount information
                        const subtotal = order.subtotal ??
                            order.items.reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                            );

                        const discount = order.discount ?? 0;
                        const couponCode = order.couponCode ?? "";

                        return (
                            <div className="order-card" key={order.id}>

                                {/* ORDER HEADER */}
                                <div className="order-card-header">
                                    <div>
                                        <p>ORDER ID</p>
                                        <h3>{order.id}</h3>
                                    </div>

                                    <span className={`order-status ${
                                        cancelled ? "cancelled" : ""
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <p className="order-date">{order.date}</p>

                                {/* PRODUCTS */}
                                <div className="order-products">
                                    {order.items.map((item) => (
                                        <div className="order-product" key={item.id}>
                                            <span>
                                                {item.name} × {item.quantity}
                                            </span>

                                            <span>
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* PRICE DETAILS */}
                                <div className="order-price-details">

                                    <div className="order-product">
                                        <span>Subtotal</span>
                                        <span>€{subtotal.toFixed(2)}</span>
                                    </div>

                                    {discount > 0 && (
                                        <>
                                            <div className="order-product">
                                                <span>
                                                    Coupon Applied
                                                </span>
                                                <span>{couponCode}</span>
                                            </div>

                                            <div className="order-product order-discount">
                                                <span>Discount</span>
                                                <span>
                                                    -€{discount.toFixed(2)}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <div className="order-total">
                                        <span>Final Amount</span>
                                        <strong>
                                            €{order.total.toFixed(2)}
                                        </strong>
                                    </div>

                                </div>

                                {/* TRACKING */}
                                {!cancelled && (
                                    <div className="order-tracking">

                                        <h3>Track Your Order</h3>

                                        <div className="tracking-timeline">

                                            {trackingSteps.map((step, index) => (
                                                <div
                                                    className={`tracking-step ${
                                                        index <= progress ? "completed" : ""
                                                    }`}
                                                    key={step}
                                                >
                                                    <div className="tracking-dot">
                                                        {index < progress ? "✓" : index + 1}
                                                    </div>

                                                    <p>{trackingLabels[index]}</p>
                                                </div>
                                            ))}

                                        </div>

                                        {/* DEMO STATUS CONTROLS */}
                                        <div className="tracking-controls">
                                            <p>Update Status (Demo)</p>

                                            {trackingSteps.map((step, index) => (
                                                <button
                                                    key={step}
                                                    disabled={index <= progress}
                                                    onClick={() =>
                                                        updateOrderStatus(order.id, step)
                                                    }
                                                >
                                                    {trackingLabels[index]}
                                                </button>
                                            ))}
                                        </div>

                                    </div>
                                )}

                                {/* VIEW DETAILS */}
                                <button
                                    className="view-details-button"
                                    onClick={() => toggleDetails(order.id)}
                                >
                                    {expandedOrder === order.id
                                        ? "Hide Order Details"
                                        : "View Order Details"}
                                </button>

                                {/* CUSTOMER DETAILS */}
                                {expandedOrder === order.id && (
                                    <div className="delivery-details">

                                        <h3>Customer Information</h3>

                                        <p>
                                            <strong>Name:</strong> {order.customer?.name}
                                        </p>

                                        <p>
                                            <strong>Email:</strong> {order.customer?.email}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong> {order.customer?.phone}
                                        </p>

                                        <h3 className="delivery-heading">
                                            Delivery Address
                                        </h3>

                                        <p>{order.customer?.address}</p>

                                        <p>
                                            {order.customer?.city} - {order.customer?.postalCode}
                                        </p>

                                    </div>
                                )}

                                {/* CANCEL ORDER */}
                                {!cancelled && status !== "Delivered" && (
                                    <button
                                        className="cancel-order-button"
                                        onClick={() => {
                                            const confirmCancel = window.confirm(
                                                "Are you sure you want to cancel this order?"
                                            );

                                            if (confirmCancel) {
                                                cancelOrder(order.id);
                                            }
                                        }}
                                    >
                                        Cancel Order
                                    </button>
                                )}

                            </div>
                        );
                    })}

                </div>
            )}

        </section>
    );
}

export default Orders;
