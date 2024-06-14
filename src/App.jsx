import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiStepForm from "./Components/MultiStepForm";
import Posts from "./Components/Posts";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default App;
