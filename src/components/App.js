import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Gwitter</footer>
    </>
  );
}

export default App;
