/* Central user profile, categories & preference data */

export const user = {
  name: "Maria Dela Cruz",
  email: "maria.dc@example.com",
  mobile: "+63 917 123 4567",
  emailVerified: true,
  mobileVerified: true,
  initials: "MD",
};

export const homeCategories = [
  { label: "Resorts", family: "ion", icon: "location-outline", active: "location" },
  { label: "Nature", family: "mci", icon: "tree-outline", active: "tree" },
  { label: "Pools", family: "ion", icon: "water-outline", active: "water" },
  { label: "Events", family: "ion", icon: "calendar-outline", active: "calendar" },
];

export const exploreCategories = [
  { label: "All", family: "ion", icon: "grid-outline", activeIcon: "grid" },
  { label: "Resorts", family: "ion", icon: "location-outline", activeIcon: "location" },
  { label: "Pools", family: "ion", icon: "water-outline", activeIcon: "water" },
  { label: "Nature", family: "mci", icon: "tree-outline", activeIcon: "tree" },
  { label: "Events", family: "ion", icon: "calendar-outline", activeIcon: "calendar" },
];

export const languages = ["English (US)", "Filipino", "Spanish"];

export const themeOptions = ["Light", "Dark", "System"];

export const appVersion = "HanaPin v1.0.0";