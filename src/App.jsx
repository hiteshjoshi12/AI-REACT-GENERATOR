import Header from "./components/Header/Header";
import { ThemeProvider } from "./components/Context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="border-2 font-[outfit] min-h-screen bg-black" data-theme="light">
        <Header />
      </div>
    </ThemeProvider>
  );
};

export default App;
