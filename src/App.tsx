import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Credits from "./components/Credit";
import CreditForm from "./components/Credit/CreditForm";
import Footer from "./components/Footer";
import ForgotPasswordSide from "./components/ForgotPassword";
import Header from "./components/Header";
import Loading from "./components/Loading";
import SignInSide from "./components/Login";
import Profile from "./components/Profile";
import Promotions from "./components/Promotion";
import PromotionForm from "./components/Promotion/PromotionForm";
import SignUpSide from "./components/SignUp";
import Timeline from "./components/Timeline";
import Transactions from "./components/Transaction";
import TransactionForm from "./components/Transaction/TransactionForm";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

function Protected({ children }: any) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children as JSX.Element;
}

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/faq" element={<Navigate to="/" />} />

          <Route path="/iniciar-sesion" element={<SignInSide />} />
          <Route path="/registro" element={<SignUpSide />} />
          <Route
            path="/recuperar-contrasena"
            element={<ForgotPasswordSide />}
          />

          <Route
            path="/perfil"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route path="/perfil/editar" element={<Navigate to="/" />} />
          <Route
            path="/perfil/editar-contrasena"
            element={<Navigate to="/" />}
          />

          <Route
            path="/creditos"
            element={
              <Protected>
                <Credits />
              </Protected>
            }
          />
          <Route
            path="/creditos/crear"
            element={
              <Protected>
                <CreditForm />
              </Protected>
            }
          />
          <Route path="/creditos/:id" element={<Credits />} />

          <Route
            path="/promociones"
            element={
              <Protected>
                <Promotions />
              </Protected>
            }
          />
          <Route
            path="/promociones/crear"
            element={
              <Protected>
                <PromotionForm />
              </Protected>
            }
          />
          <Route path="/promociones/editar/:id" element={<PromotionForm />} />
          <Route path="/promociones/:id" element={<Promotions />} />

          <Route
            path="/transacciones"
            element={
              <Protected>
                <Transactions />
              </Protected>
            }
          />
          <Route
            path="/transacciones/crear"
            element={
              <Protected>
                <TransactionForm />
              </Protected>
            }
          />
          <Route path="/transacciones/:id" element={<Transactions />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </AuthProvider>
  );
}

export default App;
