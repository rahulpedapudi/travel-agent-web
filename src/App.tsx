import { Routes, Route, Navigate } from "react-router-dom";
import { ChatContainer } from "@/components/Chat/ChatContainer";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthPage } from "@/components/Auth/AuthPage";
import { HomePage } from "@/components/Home/HomePage";
import { PopularDestinations } from "@/components/Popular/PopularDestinations";
import { MyTripsPage } from "@/components/Trips/MyTripsPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/popular" element={<PopularDestinations />} />
      <Route path="/trips" element={<MyTripsPage />} />
      <Route
        path="/"
        element={
          <AppLayout>
            <ChatContainer />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
