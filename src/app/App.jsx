import AppRoutes from "./routes";
import Navbar from "../components/common/Navbar";

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
