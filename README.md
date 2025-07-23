# 📊 Mini Nivii Frontend

A modern, intelligent React application for AI-powered data analytics with automatic chart visualization. Features smart chart type detection and support for multiple visualization types including bar charts, line charts, pie charts, and area charts.

## ✨ Key Features

- **🤖 Smart Chart Detection**: Automatically selects the best chart type based on your query
- **📊 Multiple Chart Types**: Bar, Line, Pie, and Area charts
- **🎛️ Manual Override**: Chart type selector for manual control
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🔄 Real-time Updates**: Interactive charts with hover effects and tooltips
- **⚡ Modern Architecture**: React 18 with TypeScript and custom hooks
- **🛡️ Error Handling**: Robust error handling with user-friendly messages

## 🎯 Smart Chart Examples

### 📊 Bar Charts (Comparisons & Rankings)
Perfect for comparing values across categories:
```
"top-selling product in October"
"revenue by department"
"sales comparison by region"
"best performing teams this quarter"
```

### 📈 Line Charts (Trends & Time Series)
Ideal for showing evolution over time:
```
"evolution of total sales through time"
"revenue trend over the last 12 months"
"user growth throughout 2024"
"monthly website traffic change"
"sales performance over time"
```

### 🥧 Pie Charts (Distributions & Proportions)
Great for showing parts of a whole:
```
"distribution of sold products"
"market share breakdown by company"
"percentage of sales by category"
"proportion of users by device type"
"budget allocation by department"
```

### � Area Charts (Cumulative Data)
Best for accumulated values over time:
```
"cumulative revenue over quarters"
"total accumulated sales this year"
"cumulative user registrations"
"accumulated profit by month"
```

## � Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd nivii-challenge-fe
   npm install
   ```

2. **Environment configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_APP_NAME=Mini Nivii
   VITE_APP_VERSION=1.0.0
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**: Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
npm run preview
```

## �️ Project Architecture

```
src/
├── components/              # UI Components
│   ├── ChartDisplay.tsx    # Multi-type chart renderer
│   ├── ChartTypeSelector.tsx # Manual chart type selection
│   ├── SearchForm.tsx      # Query input form
│   ├── ErrorMessage.tsx    # Error handling UI
│   ├── Header.tsx          # App header
│   └── index.ts           # Component exports
├── hooks/                  # Custom React Hooks
│   └── useQuery.ts        # Query & chart type management
├── services/              # External Services
│   └── api.ts            # API communication
├── config/               # Configuration
│   └── constants.ts      # App constants & messages
├── types/               # TypeScript Definitions
│   └── index.ts        # Type definitions
├── App.tsx            # Main application
├── main.tsx          # Entry point
└── index.css        # Global styles
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts |
| **HTTP Client** | Axios |
| **State Management** | React Hooks |

## 🎨 Chart Type Detection

The application intelligently detects the best chart type based on keywords in your query:

| Chart Type | Trigger Keywords | Use Case |
|------------|------------------|----------|
| **Pie** | distribution, percentage, proportion, share, breakdown | Parts of a whole |
| **Line** | evolution, trend, over time, through time, growth, change | Time series data |
| **Area** | cumulative, total over, accumulated | Cumulative values |
| **Bar** | Default for all other queries | Comparisons |

## 🔧 API Integration

### Expected Response Format

```typescript
interface QueryResponse {
  data: Array<{[key: string]: any}>;
  chartType?: 'bar' | 'line' | 'pie' | 'area'; // Optional override
  message?: string;
  query?: string;
}
```

### Example API Responses

**Bar Chart Data**:
```json
{
  "data": [
    {"product": "Laptop", "sales": 1200},
    {"product": "Phone", "sales": 800},
    {"product": "Tablet", "sales": 600}
  ]
}
```

**Time Series Data**:
```json
{
  "data": [
    {"month": "Jan", "revenue": 10000},
    {"month": "Feb", "revenue": 12000},
    {"month": "Mar", "revenue": 11500}
  ],
  "chartType": "line"
}
```

## 🎛️ User Interface

### Smart Features
- **Auto-Detection**: Charts automatically match your query intent
- **Manual Override**: Click chart type buttons to change visualization
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: WCAG compliant with proper ARIA labels
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Clear error messages with retry options

### Example Workflow
1. Enter query: *"distribution of sales by region"*
2. System detects "distribution" → Automatically selects Pie Chart
3. Data loads and displays as pie chart
4. Optionally change to bar chart using the selector buttons

## 🚦 Environment Configuration

Create `.env` file with:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# App Metadata
VITE_APP_NAME=Mini Nivii
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@nivii.com
- 🐛 Issues: [GitHub Issues](../../issues)
- 📖 Documentation: [Wiki](../../wiki)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
