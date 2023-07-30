import "./App.css";
import LoginForm from "./LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginForm />} />
          <Route path="/user" exact element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
