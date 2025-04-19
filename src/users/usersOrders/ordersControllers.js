//Get all stocks  
export const getAllStocks = async (req, res) => {
    try {
        const stockItems = await Stock.findAll();
        res.json(stockItems);
    } catch (error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    const { user_id, items } = req.body;

    if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
        return res
            .status(400)
            .json({ error: "Invalid request: user_id and items are required" });
    }

    try {
        // Validate user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Calculate total amount and validate stock
        let totalAmount = 0;
        for (const item of items) {
            const stockItem = await Stock.findByPk(item.stock_id);
            if (!stockItem) {
                return res
                    .status(404)
                    .json({ error: `Stock item with ID ${item.stock_id} not found` });
            }
            if (stockItem.stock_quantity < item.quantity) {
                return res
                    .status(400)
                    .json({ error: `Insufficient stock for item ${stockItem.name}` });
            }
            totalAmount += stockItem.price * item.quantity;
        }

        // Add shipping cost (static $5.00)
        totalAmount += 5.0;

        // Create the order
        const order = await Order.create({
            user_id,
            total_amount: totalAmount,
            status: "Pending",
        });

        // Create order items and update stock
        for (const item of items) {
            const stockItem = await Stock.findByPk(item.stock_id);
            await OrderItem.create({
                order_id: order.id,
                stock_id: item.stock_id,
                quantity: item.quantity,
                unit_price: stockItem.price,
            });
            // Update stock quantity
            stockItem.stock_quantity -= item.quantity;
            await stockItem.save();
        }

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};