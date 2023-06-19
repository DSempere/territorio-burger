import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Router from "./components/Router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header />
        <Router />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
