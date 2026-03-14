import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MenuBar from "./components/MenuBar";

const App = () => {
  return (
    <div>
      <MenuBar />
      <Desktop />  
      <Dock />
    </div>
  );
};

export default App;
