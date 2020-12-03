import Nav from "./components/Nav.js";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Profile from "./components/Profile";
import Learnhook from "./components/Learnhook";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer, intialState } from "./reducers/userReducer";
export const userContext = createContext();

const Routing = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    let user_data = JSON.parse(localStorage.getItem("user"));
    console.log(user_data);

    if (user_data) {
      dispatch({ type: "USER", payload: user_data });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
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
      <Route path="/hook">
        <Learnhook />
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Nav />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
