import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ChatContainer } from "@/components/Chat/ChatContainer";
import { HomePage } from "@/components/Home/HomePage";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthPage } from "@/components/Auth/AuthPage";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout>
              <Outlet />
            </AppLayout>
          </ProtectedRoute>
        }>
        <Route path="/" element={<HomePage />} />
        <Route path="/c/:chatId" element={<ChatContainer />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
