/* Central AI concierge chatbot data */

export const chatQuickActions = ["Check Booking Status", "Resort Amenities"];

export const chatGreeting =
  "Hi! 👋 I'm Hana, your AI travel concierge. I can help you check bookings, explore resort amenities, or find the perfect getaway.";

export const chatReplies = {
  booking:
    "You have 1 upcoming booking: Costa Abril on June 20, 2026. Want me to pull up the details?",
  amenity:
    "Costa Abril offers Wi-Fi, BBQ Area, Wave Pool, Pet Friendly, Karaoke, and a Restaurant. Anything else you'd like to know?",
  price:
    "Entrance fees start at ₱200 per person and day tour cottages are ₱500. Would you like the full price list?",
  hours: "Costa Abril is open daily from 8:00 AM to 10:00 PM.",
  fallback:
    "Thanks for your message! Feel free to ask about bookings, prices, hours, or amenities, or use a quick action below. 😊",
};

export const getChatReply = (text) => {
  const t = text.toLowerCase();
  if (t.includes("book") || t.includes("booking")) return chatReplies.booking;
  if (t.includes("amenit")) return chatReplies.amenity;
  if (t.includes("price") || t.includes("fee") || t.includes("how much") || t.includes("cost"))
    return chatReplies.price;
  if (t.includes("hour") || t.includes("open") || t.includes("close")) return chatReplies.hours;
  return chatReplies.fallback;
};