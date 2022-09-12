import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUser } from "./recoil/atoms";
import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { useEffect } from "react";
import Events from "./components/Events";
import NewEvent from "./components/NewEvent";
import CalorieCalculator from "./components/CalorieCalculator";

function App() {

  const setUser = useSetRecoilState(currentUser)

  const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://cardio-calendar.herokuapp.com' : 'http://localhost:3000'

  useEffect(() => {
    let token = localStorage.token
    if (typeof token !== 'undefined' && token.length > 1) {
      tokenLogin(token)
    } else {
      console.log("No token found, try logging in")
    }
  }, []);
  

  function tokenLogin(token) {
    fetch(`${ENDPOINT}/auto_login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt: token }),
    })
    .then((r) => r.json())
    .then((u) => setUser(u))
  }

  function handleLogout() {
    setUser(null)
    localStorage.removeItem('token')
  }

  // console.log(user)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }



  return (

    <Router basename={"/cardio-calendar-frontend"}>
      <Box className="App">
        <NavBar handleLogout={handleLogout}/>
        <Routes>
          <Route
            path="/home"
            element={
                <Home ENDPOINT={ENDPOINT}/>
            }
          />
          <Route
            path="/"
            element={
                <Login 
                  setUser={setUser}
                  ENDPOINT={ENDPOINT}
                />
            }
          />
          <Route
            path="/signup"
            element={
                <SignUp 
                  setUser={setUser}
                  ENDPOINT={ENDPOINT}
                />
            }
          />
          <Route
            path="/event"
            element={
                <Events
                ENDPOINT={ENDPOINT}
                capitalizeFirstLetter={capitalizeFirstLetter}
                />
            }
          />
          <Route
            path="/new_event"
            element={
                <NewEvent
                ENDPOINT={ENDPOINT}
                />
            }
          />
          <Route 
            path="/calculator"
            element={
              <CalorieCalculator 
                capitalizeFirstLetter={capitalizeFirstLetter}
              />
            }
          />
        </Routes>
      </Box>
    </Router>

  );
}

export default App;
