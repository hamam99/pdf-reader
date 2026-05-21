import "./App.css";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="bg-white h-full w-full px-10 py-4">
      <div>
        <div className="w-full h-1 bg-slate-900" />
        <div className=" w-[100% - 12px] h-2 bg-slate-900 ml-3 " />
      </div>

      <Dashboard />
    </div>
  );
}

export default App;
