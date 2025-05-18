import { MenuItem } from '../contexts/CartContext';

// Generate unique IDs for menu items
const generateId = (category: string, name: string): string => {
  return `${category.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
};

// Define menu categories
export const menuCategories = [
  'Kebab on Pita',
  'Family Kebab Combo',
  'Kebab Meals',
  'Rice Meals',
  'Steak Meals',
  'Burgers',
  'Mediterranean Burger',
  'Meals/Dishes',
  'Toasties',
  'Snacks'
];

// Create menu items with descriptions, prices, and categories
export const menuItems: MenuItem[] = [
  // Kebab on Pita
  {
    id: generateId('Kebab on Pita', 'Chicken Kebab'),
    name: 'Chicken Kebab',
    description: 'Garlic marinated chicken with coleslaw. Includes half wedges and any 330ml soft drink.',
    price: 12.00,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Half Chicken Kebab'),
    name: 'Half Chicken Kebab',
    description: 'Garlic marinated chicken with coleslaw. Includes half wedges and any 330ml soft drink.',
    price: 6.00,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Beef Kebab'),
    name: 'Beef Kebab',
    description: 'Beef with tabbouleh salad & yogurt sauce. Includes half wedges and any 330ml soft drink.',
    price: 12.50,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Lamb Kebab'),
    name: 'Lamb Kebab',
    description: 'Lamb with tabbouleh salad & garlic sauce. Includes half wedges and any 330ml soft drink.',
    price: 13.50,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Mixed Kebab'),
    name: 'Mixed Kebab',
    description: 'Chicken, beef, lamb with tabbouleh salad & yogurt sauce. Includes half wedges and any 330ml soft drink.',
    price: 13.00,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Falafel Kebab'),
    name: 'Falafel Kebab (V)',
    description: 'Falafel with tabbouleh salad. Includes half wedges and any 330ml soft drink.',
    price: 11.50,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Chicken Chasseurs'),
    name: 'Chicken Chasseurs',
    description: 'Chicken, egg, cheese & tomato. Includes half wedges and any 330ml soft drink.',
    price: 13.00,
    category: 'Kebab on Pita'
  },
  {
    id: generateId('Kebab on Pita', 'Cordon Bleu'),
    name: 'Cordon Bleu',
    description: 'Chicken, ham & cheese. Includes half wedges and any 330ml soft drink.',
    price: 13.00,
    category: 'Kebab on Pita'
  },
  
  // Family Kebab Combo
  {
    id: generateId('Family Kebab Combo', 'Family Kebab Combo'),
    name: 'Family Kebab Combo',
    description: '4x chicken kebabs, 2x wedges, 1.5L soft drink.',
    price: 60.00,
    category: 'Family Kebab Combo'
  },
  
  // Kebab Meals
  {
    id: generateId('Kebab Meals', 'Chicken'),
    name: 'Chicken Kebab Meal',
    description: 'Served with tabbouleh salad, tomatoes, yogurt sauce, pita bread, wedges.',
    price: 19.00,
    category: 'Kebab Meals'
  },
  {
    id: generateId('Kebab Meals', 'Beef'),
    name: 'Beef Kebab Meal',
    description: 'Served with tabbouleh salad, tomatoes, yogurt sauce, pita bread, wedges.',
    price: 20.00,
    category: 'Kebab Meals'
  },
  {
    id: generateId('Kebab Meals', 'Lamb'),
    name: 'Lamb Kebab Meal',
    description: 'Served with tabbouleh salad, tomatoes, yogurt sauce, pita bread, wedges.',
    price: 22.00,
    category: 'Kebab Meals'
  },
  {
    id: generateId('Kebab Meals', 'Mixed'),
    name: 'Mixed Kebab Meal',
    description: 'Served with tabbouleh salad, tomatoes, yogurt sauce, pita bread, wedges.',
    price: 21.00,
    category: 'Kebab Meals'
  },
  {
    id: generateId('Kebab Meals', 'Falafel'),
    name: 'Falafel Kebab Meal',
    description: 'Served with tabbouleh salad, tomatoes, yogurt sauce, pita bread, wedges.',
    price: 18.00,
    category: 'Kebab Meals'
  },
  
  // Rice Meals
  {
    id: generateId('Rice Meals', 'Chicken'),
    name: 'Chicken Rice Meal',
    description: 'Served with rice, tabbouleh, hummus & salad.',
    price: 19.00,
    category: 'Rice Meals'
  },
  {
    id: generateId('Rice Meals', 'Beef'),
    name: 'Beef Rice Meal',
    description: 'Served with rice, tabbouleh, hummus & salad.',
    price: 20.00,
    category: 'Rice Meals'
  },
  {
    id: generateId('Rice Meals', 'Lamb'),
    name: 'Lamb Rice Meal',
    description: 'Served with rice, tabbouleh, hummus & salad.',
    price: 22.00,
    category: 'Rice Meals'
  },
  {
    id: generateId('Rice Meals', 'Mixed'),
    name: 'Mixed Rice Meal',
    description: 'Served with rice, tabbouleh, hummus & salad.',
    price: 21.00,
    category: 'Rice Meals'
  },
  {
    id: generateId('Rice Meals', 'Falafel'),
    name: 'Falafel Rice Meal',
    description: 'Served with rice, tabbouleh, hummus & salad.',
    price: 18.00,
    category: 'Rice Meals'
  },
  
  // Steak Meals
  {
    id: generateId('Steak Meals', 'Sirloin'),
    name: 'Sirloin Steak Meal',
    description: 'Served with wedges, salad & egg.',
    price: 28.00,
    category: 'Steak Meals'
  },
  {
    id: generateId('Steak Meals', 'T-Bone'),
    name: 'T-Bone Steak Meal',
    description: 'Served with wedges, salad & egg.',
    price: 28.00,
    category: 'Steak Meals'
  },
  {
    id: generateId('Steak Meals', 'Pork Chop'),
    name: 'Pork Chop Meal',
    description: 'Served with wedges, salad & egg.',
    price: 25.00,
    category: 'Steak Meals'
  },
  
  // Burgers
  {
    id: generateId('Burgers', 'One Heck of a Burger'),
    name: 'One Heck of a Burger',
    description: 'Chicken, egg, pineapple, wedges & salad.',
    price: 14.00,
    category: 'Burgers'
  },
  {
    id: generateId('Burgers', 'Mad Burger'),
    name: 'Mad Burger',
    description: 'Double beef patties, bacon, egg, wedges & salad.',
    price: 14.00,
    category: 'Burgers'
  },
  {
    id: generateId('Burgers', 'Humphrey Burger'),
    name: 'Humphrey Burger',
    description: 'Chicken, egg, ham, cheese, wedges & salad.',
    price: 14.00,
    category: 'Burgers'
  },
  {
    id: generateId('Burgers', 'Lamborghini Burger'),
    name: 'Lamborghini Burger',
    description: 'Marinated lamb, egg, tabbouleh & wedges.',
    price: 14.00,
    category: 'Burgers'
  },
  
  // Mediterranean Burger
  {
    id: generateId('Mediterranean Burger', 'Mediterranean Burger'),
    name: 'Mediterranean Burger',
    description: 'Spicy beef, egg, tabbouleh & wedges.',
    price: 15.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Grilled Chicken'),
    name: 'Grilled Chicken',
    description: 'Grilled chicken breast served with salad.',
    price: 15.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'House Burger'),
    name: 'House Burger',
    description: 'Homemade patty, bacon, egg & salad.',
    price: 15.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Super Burger'),
    name: 'Super Burger',
    description: 'Our signature super burger.',
    price: 9.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Steak Burger'),
    name: 'Steak Burger',
    description: 'Quality steak in a burger.',
    price: 8.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Hamburger'),
    name: 'Hamburger',
    description: 'Classic hamburger.',
    price: 5.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Chicken Burger'),
    name: 'Chicken Burger',
    description: 'Classic chicken burger.',
    price: 6.50,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Cheese Burger'),
    name: 'Cheese Burger',
    description: 'Classic burger with cheese.',
    price: 7.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Bacon Burger'),
    name: 'Bacon Burger',
    description: 'Burger with crispy bacon.',
    price: 6.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Egg Burger'),
    name: 'Egg Burger',
    description: 'Burger with fried egg.',
    price: 7.00,
    category: 'Mediterranean Burger'
  },
  {
    id: generateId('Mediterranean Burger', 'Fish Burger'),
    name: 'Fish Burger',
    description: 'Fresh fish burger.',
    price: 7.00,
    category: 'Mediterranean Burger'
  },
  
  // Meals/Dishes
  {
    id: generateId('Meals/Dishes', 'Mother of All Chicken'),
    name: 'Mother of All Chicken',
    description: 'Grilled breast on a bed of pita bread covered with bacon, egg & cheese.',
    price: 25.00,
    category: 'Meals/Dishes',
    isBreakfastItem: true
  },
  {
    id: generateId('Meals/Dishes', 'Grilled Breast of Chicken'),
    name: 'Grilled Breast of Chicken',
    description: 'Served with salad, wedges & apricot sauce.',
    price: 23.00,
    category: 'Meals/Dishes',
    isBreakfastItem: true
  },
  
  // Toasties
  {
    id: generateId('Toasties', 'Steak Deluxe'),
    name: 'Steak Deluxe',
    description: 'Premium steak toastie.',
    price: 12.50,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Bacon Deluxe'),
    name: 'Bacon Deluxe',
    description: 'Premium bacon toastie.',
    price: 11.00,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Mix Deluxe'),
    name: 'Mix Deluxe',
    description: 'Premium mixed toastie.',
    price: 14.00,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Chicken & Egg'),
    name: 'Chicken & Egg',
    description: 'Chicken and egg toastie.',
    price: 7.00,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Fish & Egg'),
    name: 'Fish & Egg',
    description: 'Fish and egg toastie.',
    price: 7.00,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Bacon, Lettuce, Tomato'),
    name: 'Bacon, Lettuce, Tomato',
    description: 'Classic BLT toastie.',
    price: 7.00,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Mushroom'),
    name: 'Mushroom',
    description: 'Mushroom toastie.',
    price: 5.50,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Bacon'),
    name: 'Bacon',
    description: 'Bacon toastie.',
    price: 5.50,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Ham'),
    name: 'Ham',
    description: 'Ham toastie.',
    price: 4.50,
    category: 'Toasties'
  },
  {
    id: generateId('Toasties', 'Cheese'),
    name: 'Cheese',
    description: 'Cheese toastie.',
    price: 4.50,
    category: 'Toasties'
  },
  
  // Snacks
  {
    id: generateId('Snacks', 'Chicken Nachos'),
    name: 'Chicken Nachos',
    description: 'Nachos with chicken.',
    price: 12.50,
    category: 'Snacks'
  },
  {
    id: generateId('Snacks', 'Beef Nachos'),
    name: 'Beef Nachos',
    description: 'Nachos with beef.',
    price: 12.50,
    category: 'Snacks'
  },
  {
    id: generateId('Snacks', 'Chicken Wedges'),
    name: 'Chicken Wedges',
    description: 'Potato wedges with chicken.',
    price: 12.00,
    category: 'Snacks'
  },
  {
    id: generateId('Snacks', 'Beef Wedges'),
    name: 'Beef Wedges',
    description: 'Potato wedges with beef.',
    price: 12.00,
    category: 'Snacks'
  },
  {
    id: generateId('Snacks', 'Vegetarian Nachos'),
    name: 'Vegetarian Nachos',
    description: 'Vegetarian nachos.',
    price: 11.00,
    category: 'Snacks'
  }
];

// Get menu items by category
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

// Check if an item is a breakfast item
export const isBreakfastItem = (itemId: string): boolean => {
  const item = menuItems.find(item => item.id === itemId);
  return item?.isBreakfastItem || false;
};