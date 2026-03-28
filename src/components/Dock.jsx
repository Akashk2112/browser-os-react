import finder from "../assets/icons/Finder.png";
import message from "../assets/icons/Messages.png";
import chrome from "../assets/icons/Chrome.png";
import calculator from "../assets/icons/Calculator.png";
import calendar from "../assets/icons/Calendar.png";
import trash_empty from "../assets/icons/Trash Empty.png";
import settings from "../assets/icons/Settings.png";
import { useDispatch, useSelector } from "react-redux";
import {
  openWindow,
  setActiveWindow,
  unminimizeWindow,
} from "../store/feature/windowSlice";

const Dock = () => {
  const dispatch = useDispatch();
  const windows = useSelector((state) => state.window.windows);

  const dockApps = [
    { id: "finder", icon: finder, alt: "Finder icon" },
    { id: "message", icon: message, alt: "Message icon" },
    { id: "chrome", icon: chrome, alt: "chrome icon" },
    { id: "calculator", icon: calculator, alt: "Calculator icon" },
    { id: "calendar", icon: calendar, alt: "Calendar icon" },
    { id: "settings", icon: settings, alt: "Settings icon" },
    { id: "trash_empty", icon: trash_empty, alt: "Trash_empty icon" },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/15 h-16 rounded-2xl absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 px-2 py-1 z-50">
      {dockApps.map((app) => (
        <div key={app.id} className="relative">
          <img
            onClick={() => {
              if (windows[app.id]) {
                dispatch(setActiveWindow(app.id));
                dispatch(unminimizeWindow(app.id));
              } else {
                dispatch(openWindow(app.id));
                dispatch(setActiveWindow(app.id));
              }
            }}
            src={app.icon}
            alt={app.alt}
            className="w-12 h-12 cursor-pointer hover:scale-110 transition duration-200"
          />
          {windows[app.id] && (
            <span className="inline-block w-1 h-1 bg-gray-800 rounded-full absolute left-1/2 -translate-x-1/2 -bottom-1"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dock;
