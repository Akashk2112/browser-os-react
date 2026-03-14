import { IoLogoApple } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

const MenuBar = () => {
  return (
    <>
      <nav className="fixed w-full px-3 pt-1 bg-white/20 backdrop-blur-xl border border-white/30 text-white text-sm flex items-center justify-between">
        <div className="left_side_nav flex items-center gap-3">
          <IoLogoApple className="text-white text-lg mb-1" />
          <span>Finder</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="right_side_nav flex items-center gap-3">
          <IoIosNotifications className="text-white text-lg"/>
          <span>Tue 12:49 PM</span>
        </div>
      </nav>
    </>
  );
};

export default MenuBar;
