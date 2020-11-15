import Nav from "./components/nav";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./components/Profile";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
