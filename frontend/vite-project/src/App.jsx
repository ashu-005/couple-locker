import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LockerDetails from "./pages/LockerDetails";
import CreateLocker from "./pages/CreateLocker";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/locker/:id"
                    element={<LockerDetails />}
                />

                <Route
                    path="/create-locker"
                    element={<CreateLocker />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
