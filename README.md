# Astra Image Generator

A full-stack web application that allows designers to generate images using DALL·E AI and administrators to monitor, search, and manage their work.

## Features

### Designer Interface

- Sign in with Google authentication
- Generate images using text prompts with DALL·E
- Save generated images to personal gallery
- Search through personal generated images

### Admin Dashboard

- Monitor multiple designers and their generated images
- Search across all designers' work
- Filter images by designer
- View detailed image information

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **UI Components**: Shadcn UI with Neobrutalism design
- **Authentication**: Firebase Authentication (Google)
- **Database**: Firebase Firestore
- **Storage**: Cloudinary
- **Image Generation**: OpenAI DALL·E 3

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Firebase account
- Cloudinary account
- OpenAI API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/astra-demo-app.git
cd astra-demo-app
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```
# OpenAI API Configuration
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

4. Run the development server

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js app router
│   ├── admin/            # Admin dashboard
│   ├── dashboard/        # Designer dashboard
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # Shadcn UI components
│   ├── ImageGallery.tsx  # Image gallery component
│   ├── ImageGenerator.tsx # Image generator component
│   ├── Navbar.tsx        # Navigation component
│   └── SearchBar.tsx     # Search component
└── lib/                  # Utility functions
    ├── auth-context.tsx  # Authentication context
    ├── cloudinary.ts     # Cloudinary configuration
    ├── firebase.ts       # Firebase configuration
    ├── firebase-service.ts # Firebase service functions
    ├── openai.ts         # OpenAI configuration
    └── utils.ts          # Utility functions
```

## Authentication and Authorization

- Users sign in with Google authentication
- New users are assigned the 'designer' role by default
- Admin role must be manually assigned in the Firebase database

## Image Storage

- Images are stored in Cloudinary
- Each user's images are stored in a separate folder
- Images are optimized automatically by Cloudinary

## Environment Variables

This project uses environment variables to manage sensitive information like API keys. Make sure to set up your `.env.local` file as described in the installation section.

- **Client-side variables** must be prefixed with `NEXT_PUBLIC_`
- **Server-side variables** are only accessible in server components and API routes
- Never commit your `.env.local` file to version control

For more information, see:

- [Cloudinary Setup Guide](./cloudinary-setup.md)
- [Firebase Setup Guide](./firebase-setup.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
