# 💰 Expense Tracker Mobile App

A modern, cross-platform personal finance mobile application built with React Native and Expo for tracking daily expenses with intuitive category management and comprehensive spending analytics.

## 🚀 Features

### Core Functionality
- ✅ **Add Expenses** - Quick expense entry with amount, description, category, and date
- ✅ **Expense Management** - View, edit, and delete recorded expenses
- ✅ **Category Organization** - Pre-defined categories with custom icons and colors
- ✅ **Smart Analytics** - Monthly and total spending statistics
- ✅ **Dashboard Overview** - Real-time spending insights and recent transactions

### User Experience
- 📱 **Cross-Platform** - Works on Android, iOS, and Web
- 🎨 **Modern UI** - Clean, intuitive interface with Material Design
- 💾 **Offline Storage** - Local data persistence using AsyncStorage
- 📊 **Visual Analytics** - Category-wise spending breakdown with progress bars
- 🗓️ **Date Management** - Easy date selection with native date picker

### Technical Features
- ⚡ **Real-time Updates** - Instant data synchronization across screens
- 🔄 **State Management** - Efficient React Context API implementation
- 📱 **Responsive Design** - Optimized for different screen sizes
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🎯 **Performance** - Optimized rendering and smooth animations

## 🛠️ Technologies Used

| Category | Technologies |
|----------|-------------|
| **Frontend** | React Native, TypeScript, JavaScript |
| **Framework** | Expo SDK 53 |
| **Navigation** | Expo Router (File-based routing) |
| **Storage** | AsyncStorage (SharedPreferences equivalent) |
| **UI Library** | React Native Paper, Expo Vector Icons |
| **State Management** | React Context API, Custom Hooks |
| **Development** | Metro Bundler, TypeScript Compiler |
| **Platform Support** | Android, iOS, Web |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd expense-tracker
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on your preferred platform**
- **Android**: Press `a` or scan QR code with Expo Go app
- **iOS**: Press `i` or scan QR code with Camera app
- **Web**: Press `w` or visit `http://localhost:8081`

### Development Commands

```bash
# Start development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios

# Run on web browser
npm run web

# Type checking
npm run type-check

# Build for production
npx expo build
```

## 📁 Project Structure

```
expense-tracker/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab navigator layout
│   │   ├── index.tsx            # Dashboard screen
│   │   ├── add.tsx              # Add expense screen
│   │   ├── expenses.tsx         # Expenses list screen
│   │   └── stats.tsx            # Statistics screen
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable UI components
│   └── ui/
│       ├── CategorySelector.tsx # Category selection component
│       ├── ExpenseCard.tsx      # Individual expense display
│       └── StatsCard.tsx        # Statistics card component
├── constants/                    # App constants
│   └── categories.ts            # Default expense categories
├── contexts/                     # React Context providers
│   └── ExpenseContext.tsx       # Global expense state management
├── hooks/                        # Custom React hooks
│   └── useExpense.tsx           # Expense context hook
├── services/                     # Data layer services
│   └── expenseService.ts        # AsyncStorage operations
├── types/                        # TypeScript type definitions
│   └── expense.ts               # Expense-related interfaces
└── README.md                     # Project documentation
```

## 🎯 Usage

### Adding an Expense
1. Navigate to the **Add Expense** tab
2. Enter the expense amount
3. Add a description
4. Select a category
5. Choose the date (defaults to today)
6. Tap **Add Expense**

### Viewing Expenses
- **Dashboard**: See recent expenses and monthly summary
- **Expenses Tab**: View all expenses with delete functionality
- **Statistics**: Analyze spending by category with visual breakdowns

### Managing Categories
The app includes 8 pre-defined categories:
- 🍽️ Food & Dining
- 🚗 Transportation
- 🛒 Shopping
- 🎬 Entertainment
- 📄 Bills & Utilities
- 🏥 Healthcare
- 🎓 Education
- ➕ Other

## 📊 Key Features Breakdown

### Dashboard Screen
- Monthly spending overview
- Total expenses summary
- Recent transactions list
- Quick stats cards

### Add Expense Screen
- Form validation
- Category selector with icons
- Date picker integration
- Success/error handling

### Expenses List Screen
- All expenses chronologically
- Delete functionality
- Category visual indicators
- Empty state handling

### Statistics Screen
- Category-wise spending breakdown
- Percentage calculations
- Visual progress indicators
- Sorted by spending amount

## 🔮 Future Enhancements

- [ ] **Budget Management** - Set monthly budgets per category
- [ ] **Data Export** - Export expenses to CSV/PDF
- [ ] **Expense Search** - Search and filter functionality
- [ ] **Recurring Expenses** - Add recurring expense templates
- [ ] **Multi-Currency** - Support for different currencies
- [ ] **Cloud Sync** - Backend integration for data synchronization
- [ ] **Expense Photos** - Attach receipt images to expenses
- [ ] **Advanced Analytics** - Weekly/yearly reports and trends

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Notes

- **Data Persistence**: Uses AsyncStorage for local data storage
- **State Management**: Context API for global state management
- **Cross-Platform**: Tested on Android, iOS, and Web platforms
- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance**: Optimized for smooth user experience

## 📱 Screenshots

> *Add screenshots of your app here to showcase the UI*

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a learning project to demonstrate React Native, TypeScript, and mobile app development skills.

---

**⭐ Star this repository if you found it helpful!**
