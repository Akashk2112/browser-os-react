import { useSelector } from "react-redux";
import Window from "./Window";

const WindowManager = () => {
  const windows = useSelector((state) => state.window.windows);

  return (
    <div className="h-full w-full absolute top-0 left-0">
      {windows.finder && <Window title ="Finder" id ="finder"/>}
      {windows.message && <Window title ="Message" id="message"/>}
      {windows.chrome && <Window title ="Chrome" id="chrome"/>}
      {windows.calculator && <Window title ="Calculator" id="calculator"/>}
      {windows.calendar && <Window title ="Calendar" id="calendar"/>}
      {windows.settings && <Window title ="Settings" id="settings"/>}
      {windows.trash_empty && <Window title ="Trash" id="trash_empty"/>}
    </div>
  );
};

export default WindowManager;
