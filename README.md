# Next Furniture

A modern, full-stack e-commerce platform built for the furniture industry. Production-ready application powered by Next.js 16, React 19, and Supabase.

<img src="/public/screenshots/p1.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p2.webp" width="600" alt="Next Furniture upload">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase)

## Tech Stack

| Category          | Technologies                                               |
| ----------------- | ---------------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router, Server Components, Server Actions) |
| **UI**            | React 19, TypeScript 5, Tailwind CSS 4                     |
| **Components**    | shadcn/ui, Radix UI, Lucide Icons                          |
| **Database**      | Supabase (PostgreSQL)                                      |
| **Auth**          | Supabase Auth with SSR                                     |
| **Forms**         | React Hook Form + Zod                                      |
| **Carousel**      | Swiper, Embla Carousel                                     |
| **Charts**        | Recharts                                                   |
| **Animation**     | Motion                                                     |
| **Notifications** | Sonner                                                     |
| **Search**        | Command Palette (cmdk)                                     |
| **Storage**       | Supabase Storage                                           |

## Features

### E-Commerce

- 7 main categories with 20+ subcategories for dynamic product management
- Advanced search with CMD+K shortcut, debounce, and real-time filtering
- Product detail pages with gallery, dynamic attributes (material, dimensions, color, weight, warranty)
- Discount products section with dedicated page
- Pagination across all listing pages

### Admin Dashboard

- Category distribution analytics with Recharts pie charts
- Multi-step product creation form (3 steps with validation at each step)
- Hero carousel slide management with ordering
- Client-side image compression before upload
- Full CRUD operations for product management

### SEO & Performance

- Dynamic metadata, Open Graph, and Twitter Cards for every page
- JSON-LD structured data and automatic sitemap generation
- Rate limiting with LRU cache-based token bucket algorithm
- Lazy loading, code splitting, and Server Components for minimal client-side JavaScript
- Breadcrumb navigation with schema markup

### Security

- Supabase SSR session management
- Middleware-based admin route protection
- Role-based access control
- Secure server actions for all database operations

## Project Structure

```
app/
├── (main)/                # Customer-facing pages
│   ├── page.tsx           # Home (hero, latest products, categories)
│   ├── categories/        # Category & subcategory pages
│   ├── discount-products/ # Promotional items
│   ├── about-us/          # About page
│   └── our-store/         # Store location & contact
├── (admin)/               # Protected admin dashboard
│   └── admin/
│       ├── page.tsx       # Dashboard analytics
│       ├── furnitures/    # Product management & add form
│       └── hero/          # Hero slide management
├── (auth)/                # Authentication pages
│   └── auth/login/
├── (actions)/             # Server Actions
│   └── actions/           # Database operation functions
├── layout.tsx             # Root layout, fonts, providers
└── globals.css            # Global styles & theme

components/
├── ui/                    # shadcn/ui components (25+)
├── product/               # Product cards, gallery, sliders
├── header/                # Navigation with category menu
├── footer/                # Footer with links
└── searchbar/             # CMD+K search interface

lib/
├── supabase/              # Database client setup
├── constants/             # Categories, navigation links
└── utils/                 # Helper functions

schemas/                   # Zod validation schemas
types/                     # TypeScript type definitions
public/                    # Static assets & category images
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/furkanarslan1/next-furniture.git
cd next-furniture
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Pages Overview

| Page              | Route                                         | Description                                           |
| ----------------- | --------------------------------------------- | ----------------------------------------------------- |
| Home              | `/`                                           | Hero carousel, latest products, categories, discounts |
| Categories        | `/categories/[slug]`                          | Products filtered by category with subcategories      |
| Subcategory       | `/categories/[slug]/[typeSlug]`               | Products filtered by type                             |
| Product Detail    | `/categories/[slug]/[typeSlug]/[productSlug]` | Full product page with gallery & attributes           |
| Discount Products | `/discount-products`                          | All discounted items                                  |
| About Us          | `/about-us`                                   | Company values & stats                                |
| Our Store         | `/our-store`                                  | Location, map & contact info                          |
| Login             | `/auth/login`                                 | Admin authentication                                  |
| Dashboard         | `/admin`                                      | Analytics overview                                    |
| Manage Products   | `/admin/furnitures`                           | Product listing & management                          |
| Add Product       | `/admin/furnitures/add`                       | Multi-step product creation                           |
| Hero Management   | `/admin/hero`                                 | Carousel slide management                             |

<img src="/public/screenshots/p3.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p4.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p5.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p6.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p7.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p8.webp" width="600" alt="Next Furniture upload">
<img src="/public/screenshots/p9.webp" width="600" alt="Next Furniture upload">

## License

This project is licensed under the [MIT License](LICENSE).
