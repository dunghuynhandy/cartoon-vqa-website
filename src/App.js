import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Download from "./pages/Download";
import Examples from "./pages/Examples";
import Visualize from "./pages/Visualize";
import People from "./pages/People";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist/dropdown';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="download" element={<Download />} />
          <Route path="examples" element={<Examples />} />
          <Route path="visualize" element={<Visualize />} />
          <Route path="people" element={<People />} />
        </Route>
      </Routes>
  );
}
export default App;
