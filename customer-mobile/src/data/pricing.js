/* Central pricing data for the resort price list */

export const rates = [
  {
    key: "children",
    title: "Children (3–12 yrs)",
    family: "mci",
    icon: "human-child",
    accent: "#52E6B0",
    iconBg: "#DFF9EF",
    rows: [
      { label: "Daytime", value: "₱200" },
      { label: "Overnight", value: "₱350" },
      { label: "Day & Night", value: "₱450" },
    ],
  },
  {
    key: "adults",
    title: "Adults",
    family: "ion",
    icon: "person",
    accent: "#0B5D5A",
    iconBg: "#E3F0EF",
    rows: [
      { label: "Daytime", value: "₱250" },
      { label: "Overnight", value: "₱400" },
      { label: "Day & Night", value: "₱500" },
    ],
  },
  {
    key: "senior",
    title: "Senior / PWD",
    family: null,
    icon: null,
    accent: "#CBD5DB",
    iconBg: null,
    rows: [
      { label: "Daytime", value: "₱100" },
      { label: "Overnight", value: "₱200" },
      { label: "Day & Night", value: "₱250" },
    ],
  },
];

export const cottages = [
  {
    key: "river",
    name: "River View Cottage",
    icon: "home",
    accent: "#2AAE8E",
    iconBg: "#DFF9EF",
    rows: [
      { label: "Capacity", value: "Up to 4 pax" },
      { label: "Day use rate", value: "₱500" },
    ],
  },
  {
    key: "kubo",
    name: "Native Bahay Kubo",
    icon: "leaf",
    accent: "#2AAE8E",
    iconBg: "#DFF9EF",
    rows: [
      { label: "Capacity", value: "Up to 6 pax" },
      { label: "Day use rate", value: "₱800" },
    ],
  },
  {
    key: "pavilion",
    name: "Open Pavilion",
    icon: "business",
    accent: "#2AAE8E",
    iconBg: "#DFF9EF",
    rows: [
      { label: "Capacity", value: "Up to 20 pax" },
      { label: "Day tour rate", value: "₱1,500" },
    ],
  },
];

export const rooms = [
  {
    key: "double",
    name: "Standard Double Room",
    icon: "bed",
    accent: "#0B5D5A",
    iconBg: "#E3F0EF",
    rows: [
      { label: "Capacity", value: "2 Adults" },
      { label: "Overnight rate", value: "₱1,200 / night" },
    ],
  },
  {
    key: "suite",
    name: "Executive Family Suite",
    icon: "home",
    accent: "#0B5D5A",
    iconBg: "#E3F0EF",
    rows: [
      { label: "Capacity", value: "Up to 6 pax" },
      { label: "Overnight rate", value: "₱2,400 / night" },
    ],
  },
];

export const included = [
  "Entrance to pools and resort facilities",
  "Cottage or day tour use (as selected)",
  "Free use of BBQ pits",
  "Access to changing rooms & showers",
  "Complimentary parking",
];

export const exclusions = [
  "Food and beverages",
  "Extra persons beyond stated capacity",
  "Event / function area fees",
  "Rental of floaties and equipment",
];

export const seasonal = [
  {
    period: "Peak Season (Mar – May, Holidays)",
    note: "+₱50 per person on regular entrance rates",
  },
  {
    period: "Rainy Season (Jun – Oct)",
    note: "Discounted day tour rates on select cottages",
  },
  {
    period: "Weekends & Holidays",
    note: "Day & Night passes recommended; book ahead",
  },
];