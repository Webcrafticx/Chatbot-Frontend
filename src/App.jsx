// App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;