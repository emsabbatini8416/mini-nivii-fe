# Mini Nivii Frontend

A modern, professional React application for AI-powered data analytics with a clean, responsive UI built with Tailwind CSS.

## 🚀 Features

- **Modern React Architecture**: Component-based structure with custom hooks
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **Interactive Charts**: Powered by Recharts library
- **Professional UI/UX**: Clean, accessible interface with loading states and error handling
- **Modular Code**: Well-organized file structure with reusable components

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Application header
│   ├── SearchForm.jsx   # Search input form
│   ├── ChartDisplay.jsx # Chart visualization component
│   ├── ErrorMessage.jsx # Error display component
│   └── index.js         # Component exports barrel
├── hooks/               # Custom React hooks
│   └── useQuery.js     # API query management hook
├── services/           # API and external services
│   └── api.js         # API service functions
├── config/            # Configuration files
│   └── constants.js   # Application constants
├── App.jsx           # Main application component
├── main.jsx         # Application entry point
└── index.css       # Global styles with Tailwind directives
```

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for React
- **Axios** - HTTP client for API calls

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```
   
4. Configure your environment variables in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_APP_NAME=Mini Nivii
   VITE_APP_VERSION=1.0.0
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Styling

This project uses Tailwind CSS for styling with:

- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable UI patterns
- **Consistent Spacing**: Systematic spacing scale
- **Accessible Colors**: WCAG compliant color palette

### Key Design Features

- Clean, minimal interface
- Hover states and transitions
- Loading indicators
- Error states with dismiss functionality
- Responsive grid layouts

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Copy `.env.example` to `.env` and adjust the values:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Application Configuration
VITE_APP_NAME=Mini Nivii
VITE_APP_VERSION=1.0.0
```

### API Configuration

Update the API base URL in your `.env` file:

```env
VITE_API_BASE_URL=https://your-api-domain.com
```

Or modify `src/config/constants.js` for additional API configuration:

```javascript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENDPOINTS: {
    ASK: '/ask'
  }
};
```

### Tailwind Customization

Modify `tailwind.config.js` to customize the design system:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  },
}
```

## 📊 Components

### SearchForm
- Input validation
- Loading states
- Keyboard shortcuts (Enter to submit)
- Clear functionality

### ChartDisplay
- Responsive bar charts
- Custom tooltips
- Dynamic data rendering
- Empty state handling

### ErrorMessage
- Dismissible error notifications
- Icon indicators
- Accessible design

### Header
- Application branding
- Connection status indicator
- Responsive navigation

## 🎯 Usage Examples

### Basic Query
```
"top-selling product in October"
```

### Advanced Queries
```
"revenue by month for 2024"
"customer count by region"
"most popular product categories"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.
