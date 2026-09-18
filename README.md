# The Lizzy Edit Admin CMS

The Lizzy Edit is a full-stack beauty affiliate platform built with Next.js and Supabase.

The project includes a custom content management system that allows site content to be managed through a protected admin dashboard without editing the source code directly.

The platform was designed to manage beauty content, product recommendations, journal posts, affiliate links, SEO content, images, and homepage sections from a centralized admin interface.

## Live Website

https://the-lizzy-edit.vercel.app/

## Overview

The Lizzy Edit combines a public-facing beauty website with a custom-built CMS.

The public website focuses on skincare, makeup, self-care, fragrance, beauty guides, product recommendations, and editorial content.

The admin dashboard provides tools to manage site content dynamically using Supabase as the backend and database.

## Features

- Custom admin CMS
- Protected admin authentication
- Homepage content management
- Product management
- Draft and published product status
- Beauty guide content management
- Journal publishing system
- Journal image uploads
- Affiliate link management
- Affiliate click tracking
- Dynamic product pages
- Dynamic SEO metadata
- Sitemap generation
- Google Search Console integration
- Supabase Storage integration
- Responsive design
- Mobile, tablet, and desktop layouts

## Admin CMS

The custom CMS allows an administrator to manage content directly from the website.

Editable areas include:

- Homepage hero section
- Homepage categories
- About section
- Lizzy Picks section
- Product information
- Product affiliate links
- Beauty guides
- Journal posts
- Images
- Button text and links
- Global product card labels
- Selected page content

Content is stored in Supabase and rendered dynamically on the public website.

## Journal System

The project includes a custom editorial journal system.

Administrators can:

- Create journal posts
- Edit existing posts
- Delete posts
- Upload featured images
- Add image alt text
- Add product recommendations
- Add affiliate URLs
- Save posts as drafts
- Publish posts publicly

Journal images are stored using Supabase Storage.

## Product Management

Products can be managed through the admin dashboard.

Product data includes:

- Brand
- Product name
- Category
- Product type
- Description
- Product image
- Tags
- Skin concerns
- Skin tones
- Undertones
- Affiliate URL
- Featured status
- Publication status

Published products can automatically appear throughout different areas of the website.

## Affiliate Tracking

Affiliate links include click tracking so product engagement can be monitored through the admin analytics area.

The tracking system is designed to record useful product interaction data without collecting unnecessary personal information.

## Authentication

The admin area is protected using Supabase Authentication.

Administrative actions also verify the authenticated user's role before allowing content changes.

This prevents unauthorized users from accessing or modifying CMS content.

## Database

The project uses Supabase PostgreSQL.

The CMS stores structured content using database tables including site content, products, profiles, journal content, and affiliate-related data.

Structured JSON content is also used for flexible page sections.

## Storage

Supabase Storage is used for uploaded product and journal images.

Images can be uploaded from the admin dashboard and then displayed dynamically throughout the public website.

## SEO

The website includes SEO support using Next.js Metadata.

SEO features include:

- Dynamic page titles
- Meta descriptions
- Canonical URLs
- Open Graph metadata
- Twitter metadata
- Product structured data
- Article structured data
- Website structured data
- Person structured data
- Dynamic sitemap
- robots.txt configuration
- Google Search Console verification

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

### Application Features

- Next.js App Router
- Server Components
- Server Actions
- Dynamic Routes
- Next.js Metadata API
- Structured Data
- Row Level Security

### Deployment

- Vercel

## Project Structure

```text
app/
  admin/
    analytics/
    content/
    journal/
    products/

  beauty-guide/
  fragrances/
  journal/
  makeup/
  picks/
  self-care/
  skincare/
  undertone/

components/
  Header
  Footer
  Hero
  Categories
  AboutLizzy
  LizzyPicks
  ProductCard
  AffiliateLink

lib/
  supabase/

public/
  images/