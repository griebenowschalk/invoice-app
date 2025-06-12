# Billing Buddy

A modern invoice management application built with Next.js, featuring authentication, payment processing, and email notifications.

## Live Demo

Check out the live demo at [Billing Buddy](https://billing-buddy.netlify.app/)

## Tech Stack

- **Frontend Framework**: Next.js 15.3.3
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Payment Processing**: Stripe
- **Email Service**: Resend
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/UI
- **Animation**: Framer Motion
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL database
- Clerk account for authentication
- Stripe account for payments
- Resend account for email services

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
XATA_DATABASE_URL=your_postgresql_xata_db_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

#Clerk sign-up and sign-in URLs
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_resend_verified_email_domain
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run db:push` - Push database schema changes
- `npm run db:generate` - Generate database migration files
- `npm run email:dev` - Start the react email development server

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env.local`
4. Initialize the database:
   ```bash
   npm run db:push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Code Quality

This project uses several tools to maintain code quality:

- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Husky**: For git hooks
- **lint-staged**: For running linters on staged files

The following files are automatically formatted on commit:

- JavaScript/TypeScript files (`.js`, `.jsx`, `.ts`, `.tsx`)
- Style files (`.css`, `.scss`)
- Markdown files (`.md`)
