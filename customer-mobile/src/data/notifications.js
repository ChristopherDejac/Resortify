/* Central notifications data */

export const notificationGroups = [
  {
    group: "Today",
    items: [
      {
        iconColor: "mint",
        icon: "checkmark-circle",
        title: "Booking confirmed",
        time: "9:14 AM",
        message: "Your Costa Abril Resort booking #HP-2024-8842 is confirmed.",
        unread: true,
      },
    ],
  },
  {
    group: "Yesterday",
    items: [
      {
        iconColor: "blue",
        icon: "pricetag-outline",
        title: "Promo alert",
        time: "8:02 PM",
        message: "Get 10% off day tour cottages this weekend at Tres Marinas Resort.",
        unread: true,
      },
      {
        iconColor: "gray",
        icon: "notifications-outline",
        title: "Reminder",
        time: "4:30 PM",
        message: "Don't forget to submit your review for Dado's Resort.",
        unread: false,
      },
    ],
  },
  {
    group: "Last Week",
    items: [
      {
        iconColor: "gray",
        icon: "card-outline",
        title: "Refund processed",
        time: "Mon",
        message: "Your refund of ₱2,625 for Villa Elena Resort was sent to GCash.",
        unread: false,
      },
      {
        iconColor: "mint",
        icon: "star",
        title: "New review",
        time: "Sun",
        message: "Maria Santos left a 5-star review for Costa Abril Resort.",
        unread: false,
      },
    ],
  },
];