import activityImage from "./assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";

export const activitiesData = [
  {
    id: 1,
    image: activityImage,
    category: "workshops",
    date: "2023-10-15",
    titleKey: "activities.1.title",
    descriptionKey: "activities.1.desc",
  },
  {
    id: 2,
    image: activityImage,
    category: "psycho",
    date: "2023-10-15",
    titleKey: "activities.2.title",
    descriptionKey: "activities.2.desc",
  },
  {
    id: 3,
    image: activityImage,
    category: "relief",
    date: "2023-10-15",
    titleKey: "activities.3.title",
    descriptionKey: "activities.3.desc",
  },
];

export const categories = [
  { nameKey: "categories.all", slug: "all" },
  { nameKey: "categories.relief", slug: "relief" },
  { nameKey: "categories.psycho", slug: "psycho" },
  { nameKey: "categories.development", slug: "development" },
  { nameKey: "categories.workshops", slug: "workshops" },
];
