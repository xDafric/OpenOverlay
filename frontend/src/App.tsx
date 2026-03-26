import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/ui/theme-provider";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SidebarWrapper from "./components/navigation/sidebar-wrapper";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <SidebarWrapper />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
          </Route>
          <Route
            path="/auth"
            element={
              <div className="h-dvh">
                <Outlet />
              </div>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}
