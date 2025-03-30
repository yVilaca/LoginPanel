import { Button, MantineProvider } from "@mantine/core";
import { notifications, Notifications } from "@mantine/notifications";
import { theme } from "./theme";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Login from "./Pages/Login";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Login />
    </MantineProvider>
  );
}
