import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
