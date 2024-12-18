import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const CreateUser = lazy(() => import("./Pages/CreateUser"));
const UpdateUser = lazy(() => import("./Pages/UpdateUser"));
const DeleteUser = lazy(() => import("./Pages/DeleteUser"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreateUser />}></Route>
        <Route path="/update/:id" element={<UpdateUser />}></Route>
        <Route path="/delete/:id" element={<DeleteUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
