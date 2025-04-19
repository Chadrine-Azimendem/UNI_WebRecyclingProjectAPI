import Ticket from "../../models/tickets.js";

// Get all tickets (secured for admins only)
export const getAllTickets = async (req, res) => {
    const isAdmin = req.headers["x-is-admin"] === "true";
    const userId = req.query.userId;

    try {
        let tickets;
        if (isAdmin) {
            // Admins can see all tickets
            tickets = await Ticket.findAll();
        } else {
            // Non-admins can only see their own tickets
            if (!userId) {
                return res
                    .status(400)
                    .json({ error: "User ID is required for non-admin access" });
            }
            tickets = await Ticket.findAll({ where: { account: userId } });
        }
        res.json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a ticket (status and adminResponce)
export const updateATicket = async (req, res) => {
    const ticketId = parseInt(req.params.id);
    const { status, adminResponce } = req.body; // Changed from adminResponse

    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        await ticket.update({ status, adminResponce }); // Changed from adminResponse
        res.json({ message: "Ticket updated successfully" });
    } catch (error) {
        console.error("Error updating ticket:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

// Delete a ticket
export const deleteATicket = async (req, res) => {
    const ticketId = parseInt(req.params.id);

    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        await ticket.destroy();
        res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
};