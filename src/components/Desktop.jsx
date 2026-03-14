import bg from "../assets/hero/Main_bg.jpg"
import WindowManager from "./WindowManager";

const Desktop = () => {
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="h-screen w-screen bg-cover bg-center">
      <WindowManager/>
    </div>
  );
};

export default Desktop;
