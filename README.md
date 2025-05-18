# Kebab Express - Restaurant Ordering Website

A comprehensive restaurant ordering website for Kebab Express, featuring a user-friendly interface for ordering, payment processing, and order management.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Netlify Functions
- **Database**: Supabase
- **Payment Processing**: Stripe
- **Email Notifications**: Brevo
- **Deployment**: Netlify

## Features

- Interactive menu display with categorized food items
- Shopping cart functionality with real-time updates
- Time-restricted breakfast items (available until 12:30 PM AEST)
- Secure checkout with Stripe
- Order confirmation emails via Brevo
- Staff dashboard for real-time order management
- Responsive design for mobile and desktop

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kebab-express
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Get your Supabase URL and anon key from the project settings
3. Run the SQL migration in `supabase/migrations/create_tables.sql` using the Supabase SQL Editor
4. Enable real-time functionality for the `orders` table in the Supabase dashboard

### 3. Set Up Stripe

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your Stripe secret key from the Stripe Dashboard

### 4. Set Up Brevo (formerly Sendinblue)

1. Create a Brevo account at [https://www.brevo.com](https://www.brevo.com)
2. Get your API key from the Brevo Dashboard

### 5. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
BREVO_API_KEY=your_brevo_api_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 6. Local Development

Run the development server:

```bash
npm run dev
```

### 7. Deploy to Netlify

1. Push your code to GitHub
2. Create a new site on Netlify connected to your GitHub repository
3. Configure the environment variables in the Netlify Dashboard
4. Deploy the site

## Project Structure

- `src/components/`: React components
  - `layout/`: Header, Footer, and layout components
  - `menu/`: Menu-related components
  - `cart/`: Cart-related components
  - `staff/`: Staff dashboard components
- `src/contexts/`: React context providers
- `src/pages/`: Page components
- `src/utils/`: Utility functions
- `netlify/functions/`: Netlify serverless functions

## Adding Staff Users

To add a staff user:

1. Have the user sign up through the regular authentication flow
2. Connect to your Supabase database and run the following SQL:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'staff_email@example.com';
```

## Customizing the Menu

The menu items are defined in `src/utils/menuData.ts`. You can modify this file to update menu items, prices, and categories.

## License

This project is licensed under the MIT License.