import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/Homepage/HomePage";
import ChangeLocation from "./components/Patient/Pages/ChangeLocation";
import InfoForm from "./components/Patient/Pages/InfoForm";
import PersonalInfo from "./components/Patient/Pages/PersonalInfo";
import SearchDoctor from "./components/Patient/Pages/SearchDoctor";
import SingleCategory from "./components/Patient/Pages/SingleCategory";
import Slot from "./components/Patient/Slot/Slot";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateComponent from "./routes/PrivateRoute";
import PublicComponent from "./routes/PublicRoute";
import { DoctorContextProvider } from "./context/DoctorContext";
import { CurrentUserProvider } from "./context/UserContext";
import Payment from "./components/Patient/Payment/Payment";
import Consult from "./components/Doctor/Pages/Consult";
import SingleAppointment from "./components/Patient/Pages/SingleAppointment";
import SingleDoctor from "./components/Patient/Pages/SingleDoctor";

function App() {
  return (
    <AuthContextProvider>
      <DoctorContextProvider>
        <CurrentUserProvider>
          <div className="App bg-bodyBG font-body">
            <div className="px-5 py-10 md:px-24 md:py-8">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<PublicComponent><HomePage /></PublicComponent>} />
                  <Route path="/login" element={<PublicComponent><Login /></PublicComponent>} />
                  <Route path="/signup" element={<PublicComponent><Signup /></PublicComponent>} />
                  <Route path="/dashboard" element={<PrivateComponent><Dashboard /></PrivateComponent>} />
                  <Route path="/forgotpassword" element={<PublicComponent><ForgotPassword /></PublicComponent>} />
                  <Route path="/patientinfo" element={<PrivateComponent><InfoForm /></PrivateComponent>} />
                  <Route path="/changelocation" element={<PrivateComponent><ChangeLocation /></PrivateComponent>} />
                  <Route path="/personaldetails" element={<PrivateComponent><PersonalInfo /></PrivateComponent>} />
                  <Route path="/:city/searchdoctors" element={<PrivateComponent><SearchDoctor /></PrivateComponent>} />
                  <Route path="/categories/:category" element={<PrivateComponent><SingleCategory /></PrivateComponent>} />
                  <Route path="/appointments/:id" element={<PrivateComponent><SingleAppointment /></PrivateComponent>} />
                  <Route path="/slot" element={<PrivateComponent><Slot /></PrivateComponent>} />
                  <Route path="/payment" element={<PrivateComponent><Payment /></PrivateComponent>} />
                  <Route path="/consult" element={<PrivateComponent><Consult /></PrivateComponent>} />
                  <Route path="/doctors/:id" element={<PrivateComponent><SingleDoctor /></PrivateComponent>} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </CurrentUserProvider>
      </DoctorContextProvider>
    </AuthContextProvider>
  );
}

export default App;
