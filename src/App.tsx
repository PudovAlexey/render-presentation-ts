import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import { Start } from "./components/Start";
import { StarWarsIntro } from "./components/StarWarsIntro";
import { StaticIntro } from "./components/StaticIntro";
import { Chat } from "./components/Chat";

function App() {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/intro" element={<StarWarsIntro />}></Route>
        <Route path="/static-intro" element={<StaticIntro />}></Route>
        <Route path="/list" element={<Chat />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
