
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatRoom from "./pages/ChatRoom";
import Friends from "./pages/Friends";
import UserContext from "./context/context";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{
      user,
      setUser,
    }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute loggedIn={user?.loggedIn}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/chatroom/:id" element={
            <ProtectedRoute loggedIn={user?.loggedIn}>
              <ChatRoom />
            </ProtectedRoute>
          } />
          <Route path="/friends" element={
            <ProtectedRoute loggedIn={user?.loggedIn}>
              <Friends />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
