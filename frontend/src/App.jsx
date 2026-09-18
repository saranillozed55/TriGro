import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Stores from "./pages/Stores";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />

        <div className="ml-56">
          <Navbar />

          <main className="p-8 space-y-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;