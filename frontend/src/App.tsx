import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/ui/theme-provider";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SidebarWrapper from "./components/navigation/sidebar-wrapper";
import WorkspaceProvider from "./provider/workspaceProvider";
import NoWorkspace from "./pages/NoWorkspace";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route
            path=":workspaceSlug"
            element={
              <ProtectedRoute>
                <WorkspaceProvider>
                  <SidebarWrapper />
                </WorkspaceProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <WorkspaceProvider></WorkspaceProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="no-workspace"
            element={
              <ProtectedRoute>
                <NoWorkspace />
              </ProtectedRoute>
            }
          />
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
