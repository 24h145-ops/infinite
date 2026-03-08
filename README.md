# SoleVerse - Premium Shoe E-commerce Platform

SoleVerse is a modern, full-stack e-commerce platform specializing in premium footwear, built with cutting-edge web technologies to deliver an exceptional shopping experience.

## 🚀 Features

### Core E-commerce Functionality
- **Product Catalog**: Browse men's and women's shoe collections with detailed product pages
- **Advanced Search**: Intelligent search bar for finding products quickly
- **Product Details**: High-quality product images, size guides, and comprehensive descriptions
- **Shopping Cart**: Seamless cart management with persistent state

### Innovative Features
- **Virtual Try-On**: AI-powered virtual fitting using advanced image processing
- **Reservation System**: Reserve products for limited-time availability
- **Real-time Inventory**: Live stock tracking and low-stock alerts

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern aesthetic with carefully crafted UI components
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: Built with accessibility best practices

### Authentication & Security
- **User Authentication**: Secure login/signup with Supabase
- **Password Recovery**: Forgot password functionality
- **Session Management**: Persistent user sessions with JWT tokens

### Payment Integration
- **Razorpay Integration**: Secure payment processing for Indian market
- **Order Management**: Complete order lifecycle management

## 🛠️ Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **Next.js API Routes**: Server-side API endpoints
- **Supabase Edge Functions**: Serverless functions for complex operations

### Integrations
- **Razorpay**: Payment gateway integration
- **AI Try-On Service**: External AI service for virtual fitting

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── product/[id]/      # Dynamic product pages
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── search/           # Search functionality
│   ├── tryon/            # Virtual try-on modal
│   └── reservation/       # Reservation modal
├── lib/                   # Utility libraries
│   ├── supabase/         # Database client configurations
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
│   └── products/         # Product images
└── supabase/             # Database schema and functions
    ├── functions/        # Edge functions
    └── migrations/       # Database migrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd soleverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   Configure your environment variables:
   - Supabase URL and keys
   - Razorpay API keys
   - Other service credentials

4. **Database Setup**
   ```bash
   npx supabase start
   npx supabase db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Sole Red (#FF3B3B)
- **Background**: Sole Black (#0A0A0A)
- **Surface**: Sole Surface (#1A1A1A)
- **Text**: Sole White (#FFFFFF), Sole Grey (#888888)

### Typography
- **Display**: Custom font for headings
- **Body**: System font stack
- **Mono**: Monospace for technical text

## 🔧 Development

### Code Style
- ESLint configuration for code quality
- Prettier for consistent formatting
- TypeScript for type safety

### Database Schema
- User management
- Product catalog
- Orders and payments
- Reservations
- Try-on sessions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm run start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support or questions, please contact the development team.

---

**Built with ❤️ for shoe enthusiasts worldwide**
