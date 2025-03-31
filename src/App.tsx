import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
