import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUser } from "./recoil/atoms";
import { Box, Container } from "@mui/material";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {

  const [user, setUser] = useRecoilState(currentUser)
  // const setUser = useSetRecoilState(currentUser)

  useEffect(() => {
    let token = localStorage.token
    console.log(token)
    if (typeof token !== 'undefined' && token.length > 1) {
      tokenLogin(token)
    } else {
      console.log("No token found, try logging in")
    }
  }, []);
  

  // function checkForToken() {
  //   let token = localStorage.token
  //   if (typeof token !== 'undefined' && token.length > 1) {
  //     tokenLogin(token)
  //   } else {
  //     console.log("No token found, try logging in")
  //   }
  // }

  function tokenLogin(token) {
    fetch("http://localhost:3000/auto_login", {
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
    localStorage.token = ""
  }

  console.log(user)




  return (

    <Router>
      <Box className="App">
        <NavBar handleLogout={handleLogout}/>
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route
            path="/login"
            element={
              <Container maxWidth={"false"}>
                <Login setUser={setUser}/>
              </Container>
            }
          />
          <Route
            path="/signup"
            element={
              <Container maxWidth={"false"}>
                <SignUp setUser={setUser}/>
              </Container>
            }
          />
        </Routes>
      </Box>
    </Router>

  );
}

export default App;
