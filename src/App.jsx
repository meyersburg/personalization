import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import CustomerPage from './pages/CustomerPage';
import RepDashboard from './pages/RepDashboard';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerPage />} />
          <Route path="/rep" element={<RepDashboard />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
