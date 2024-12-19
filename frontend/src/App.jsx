import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load authentication and dashboard pages
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const ManagerDashboard = lazy(() => import("./Layouts/ManagerDashboard"));

// Existing pages
const Home = lazy(() => import("./Pages/Home"));
const CreateUser = lazy(() => import("./Pages/CreateUser"));
const UpdateUser = lazy(() => import("./Pages/UpdateUser"));
const DeleteUser = lazy(() => import("./Pages/DeleteUser"));

// Protected Route Component (you'll need to implement this)

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes with Role Protection */}
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />

          {/* Existing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/delete/:id" element={<DeleteUser />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
