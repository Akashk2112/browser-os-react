import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeWindow } from "../store/feature/windowSlice";
import CalculatorApp from "../apps/CalculatorApp";

let higestZindex = 1;

const Window = (props) => {
  const dispatch = useDispatch();

  const [position, setPosition] = useState({
    x: 200,
    y: 120,
  });

  const [isDragging, setIsDragging] = useState(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    function handleMove(e) {
      if (!isDragging) return;

      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const windowWidth = 800;
      const windowHeight = 500;

      const menuBarHeight = 32;

      const maxX = screenWidth - windowWidth;
      const maxY = screenHeight - windowHeight;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(menuBarHeight, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
    }

    function handleUp() {
      setIsDragging(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      onMouseDown={() => {
        higestZindex++;
        setZIndex(higestZindex);
      }}
      style={{ top: position.y, left: position.x, zIndex: zIndex }}
      className="absolute w-[800px] h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden cursor-default"
    >
      {/* Title Bar */}
      <div
        onMouseDown={(e) => {
          setIsDragging(true);
          setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          });
        }}
        className="h-10 bg-gray-100/80 backdrop-blur flex items-center px-3 gap-2 cursor-move "
      >
        <span
          onClick={() => dispatch(closeWindow(props.id))}
          className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
        ></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></span>

        <p className="ml-4 text-sm font-medium text-gray-600">{props.title}</p>
      </div>

      {/* Body */}
      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50  p-3">
          <p>Recents</p>
          <p>Applications</p>
          <p>Desktop</p>
          <p>Documents</p>
        </div>
        {/* Content */}
        <div className="flex p-4 w-full h-full items-center justify-center">
          {props.id === "calculator" ? <CalculatorApp /> : "Content section"}
        </div>
      </div>
    </div>
  );
};

export default Window;
