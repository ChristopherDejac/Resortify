/* Central reviews data */

export const reviewDistribution = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 20 },
  { stars: 3, pct: 7 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 2 },
];

export const reviews = [
  {
    id: "1",
    name: "Juan Miguel",
    initials: "JM",
    date: "Jun 12, 2026",
    rating: 5,
    text: "Absolutely beautiful resort! The pools were crystal clear and the staff was incredibly friendly. The cottage we rented was clean and spacious — perfect for our family outing. Will definitely come back!",
    photos: ["🏊", "🏖️", "🌿"],
    response:
      "Thank you so much, Juan! We're thrilled you had a wonderful time. We look forward to welcoming you and your family back soon!",
  },
  {
    id: "2",
    name: "Maria Santos",
    initials: "MS",
    date: "Jun 8, 2026",
    rating: 5,
    text: "We had an amazing weekend here. The wave pool was a hit with the kids and the BBQ area was super clean. Great value for the price!",
    photos: ["🌊"],
    response: null,
  },
  {
    id: "3",
    name: "Rico Bautista",
    initials: "RB",
    date: "May 30, 2026",
    rating: 4,
    text: "Nice place overall. Rooms are clean and the staff are polite. Only downside was the long wait at the entrance during peak hours. Everything else was great.",
    photos: [],
    response:
      "Hi Rico, thank you for the feedback! We're glad you enjoyed your stay and are working on streamlining the check-in process during busy weekends.",
  },
];

export const reviewFilters = ["All Reviews", "With Photos", "5 Stars", "4 Stars"];