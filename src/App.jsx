import "./App.css";
import Input from "./input.jsx";
import { useState } from "react";
import FullSize from "./fullsize.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [diary, setDiary] = useState("");

  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div dir="rtl">
      <div>
        <div style={center}>
          <h1 style={{ color: "whitesmoke" }}>دفتر اليوميات</h1>
        </div>
      </div>

      <Router basename="/diaries/">
        <Routes>
          <Route
            path="/"
            element={
              <Input
                change={(diary, date) => {
                  setDiary({ diary: diary, date: date });
                }}
              />
            }
          />
          <Route path="/fully-sized" element={<FullSize data={diary} />} />
        </Routes>
      </Router>
    </div>
  );
}
