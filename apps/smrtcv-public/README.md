# Smart CV - Public Landing Page

This is the public-facing landing page for **Smart CV**, a modern resume builder. It serves as the primary entry point for users to explore features, view templates, and access the resume building application.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with CSS variables theme
- **Components**: [Radix UI](https://www.radix-ui.com/) for accessible primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Embla Carousel](https://www.embla-carousel.com/) for template browsing
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: Native fetch with Next.js caching

## ✨ Key Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Template Showcase**: Interactive carousel featuring battle-tested resume templates.
- **Pricing Page**: Transparent pricing tiers with clear CTAs for conversion.
- **FAQ System**: Categorized and searchable frequently asked questions.
- **About Page**: Mission statement and company values.
- **Global Header/Footer**: Seamless navigation between public pages and the main app.

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ 
- pnpm (recommended)

### Installation
```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable UI components
│   ├── landing/    # Landing page sections (Hero, Features, etc.)
│   ├── layout/     # Header and Footer
│   └── ui/         # Base Radix-based UI primitives
├── contexts/       # Static data (FAQs, Testimonials)
├── lib/            # Shared utilities and CDN logic
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## 🎨 Theme & Styling

This project uses **Tailwind CSS 4** with the new `@theme` directive in `src/app/globals.css`. 
- **Brand Blue**: `#3B82F6` (Primary)
- **Fluid Typography**: Responsive font sizes optimized for readability.
- **Custom Components**: Styled using `class-variance-authority` (CVA) for variant management.

## 🔒 Security

- **Next.js 15.5.8**: Patched against critical RCE and DoS vulnerabilities.
- **Input Validation**: Using Zod for type-safe data handling.

## 📄 License

Private - Smart CV © 2025
