import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import Home from "./pages/Home";
import { useEffect } from 'react';
import CreateVisitCard from './pages/VisitCard/CreateVisitCard';
import CreateInvitation from './pages/Invitation/CreateInvitation';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-visit-card/:id" element={<CreateVisitCard />} />
            <Route path="/create-visit-card" element={<CreateVisitCard />} />
            <Route path="/create-invitation-card" element={<CreateInvitation />} />

            {/* <Route path="/create-banner" element={<CreateVisitCard />} /> */}
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
