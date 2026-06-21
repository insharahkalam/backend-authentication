import orderSchema from "../models/order.model.js";
import productSchema from "../models/product.model.js";

// Create new order (user checkout)
const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;
        // items = [{ productId, quantity }]

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty!"
            });
        }

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required!"
            });
        }

        let subtotal = 0;
        const orderProducts = [];

        for (const item of items) {
            const product = await productSchema.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.productId}`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.title}. Available: ${product.stock}`
                });
            }

            // price after discount
            const finalPrice = product.discount > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price;

            const itemTotal = finalPrice * item.quantity;
            subtotal += itemTotal;

            orderProducts.push({
                product: product._id,
                title: product.title,
                image: product.image,
                price: finalPrice,
                quantity: item.quantity
            });
        }

        const tax = Math.round(subtotal * 0.16);
        const shippingFee = 0; // FREE shipping, ya apni logic daal lo
        const totalAmount = subtotal + tax + shippingFee;

        const order = await orderSchema.create({
            user: req.user.id,
            products: orderProducts,
            shippingAddress,
            subtotal,
            tax,
            shippingFee,
            totalAmount,
            status: "pending",
            paymentStatus: "unpaid",
            paymentMethod: req.body.paymentMethod || "cod"
        });

        // stock kam karo har product ka
        for (const item of items) {
            await productSchema.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity }
            });
        }

        res.status(201).json({
            message: "Order placed successfully!",
            order
        });

    } catch (error) {
        console.log(error, "error creating order");
        res.status(500).json({
            message: "Failed to place order"
        });
    }
};

// Logged-in user ke apne orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await orderSchema.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.json({
            message: "Orders fetched successfully!",
            orders
        });
    } catch (error) {
        console.log(error, "error fetching my orders");
        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};

// Admin: saare orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderSchema.find().populate("user", "username email").sort({ createdAt: -1 });

        res.json({
            message: "All orders fetched!",
            orders
        });
    } catch (error) {
        console.log(error, "error fetching all orders");
        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};

// Single order detail
const getOneOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderSchema.findById(id).populate("user", "username email");

        if (!order) {
            return res.status(404).json({
                message: "Order not found!"
            });
        }

        res.json({
            message: "Order fetched!",
            order
        });
    } catch (error) {
        console.log(error, "error fetching order");
        res.status(500).json({
            message: "Failed to fetch order"
        });
    }
};

// Admin: order status update karna
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value!"
            });
        }

        const order = await orderSchema.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found!"
            });
        }

        res.json({
            message: "Order status updated!",
            order
        });

    } catch (error) {
        console.log(error, "error updating order status");
        res.status(500).json({
            message: "Failed to update order status"
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await orderSchema.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        // sirf apna order cancel kar sakta hai
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized!" });
        }

        // sirf pending/processing wale orders cancel ho sakte hain
        if (!["pending", "processing"].includes(order.status)) {
            return res.status(400).json({ message: `Cannot cancel an order that is already ${order.status}` });
        }

        order.status = "cancelled";
        await order.save();

        // stock wapas badhao (optional but acha practice hai)
        for (const item of order.products) {
            await productSchema.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            });
        }

        res.json({ message: "Order cancelled successfully!", order });

    } catch (error) {
        console.log(error, "error cancelling order");
        res.status(500).json({ message: "Failed to cancel order" });
    }
};

export { createOrder, getMyOrders, getAllOrders, getOneOrder, updateOrderStatus, cancelOrder };
