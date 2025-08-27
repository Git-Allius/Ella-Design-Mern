import Contact from "../models/Contact.js";

export const sendContactEmail = async (req, res) => {
  const { firstname, lastname, email, phonenumber, message } = req.body;

  if (!firstname || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Save to MongoDB
    const newContact = new Contact({
      name: `${firstname} ${lastname}`,
      email,
      phonenumber, // optional
      message,
    });

    await newContact.save();

    // Return success message
    res.status(200).json({ message: "Message stored successfully" });
  } catch (error) {
    console.error("MongoDB save error:", error);
    res.status(500).json({ message: "Failed to store message" });
  }
};