import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export function CreateHomeButton() {
  return (
    <div className="py-3 px-4 bg-gray-400 rounded-lg hover:bg-gray-500 flex items-center gap-3">
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </div>
  );
}
