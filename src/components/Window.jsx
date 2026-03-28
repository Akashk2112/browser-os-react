import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeWindow,
  minimizeWindow,
  setActiveWindow,
  setWindowPosition,
  toggleMaximize,
} from "../store/feature/windowSlice";

let higestZindex = 1;

const Window = (props) => {
  const WINDOW_PRESETS = {
    calculator: { width: 290, height: 460 },
    finder: { width: 900, height: 600 },
    chrome: { width: 1100, height: 700 },
    settings: { width: 720, height: 520 },
    message: { width: 600, height: 500 },
    calendar: { width: 680, height: 550 },
    trash_empty: { width: 800, height: 500 },
  };
  const dispatch = useDispatch();

  const activeWindow = useSelector((state) => state.window.activeWindow);

  const minimized = useSelector((state) => state.window.minimized);
  const isMinimized = minimized[props.id];

  const maximized = useSelector((state) => state.window.maximized);
  const isMaximized = maximized[props.id];

  const windowPositions = useSelector((state) => state.window.windowPositions);

  const savedPosition = windowPositions[props.id] || { x: 200, y: 120 };

  const [position, setPosition] = useState({ x: 200, y: 120 });

  const preset = WINDOW_PRESETS[props.id] || { width: 800, height: 500 };

  const [isDragging, setIsDragging] = useState(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    setPosition(savedPosition);
  }, [savedPosition]);
  useEffect(() => {
    function handleMove(e) {
      if (!isDragging || isMaximized) return;

      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const windowWidth = preset.width;
      const windowHeight = preset.height;

      const menuBarHeight = 32;

      const maxX = screenWidth - windowWidth;
      const maxY = screenHeight - windowHeight;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(menuBarHeight, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
    }

    function handleUp() {
      setIsDragging(false);

      dispatch(
        setWindowPosition({ id: props.id, x: position.x, y: position.y }),
      );
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, offset, position, props.id, dispatch]);

  useEffect(() => {
    if (activeWindow === props.id) {
      higestZindex++;
      setZIndex(higestZindex);
    }
  }, [activeWindow, props.id]);

  return (
    <div
      onMouseDown={() => {
        higestZindex++;
        setZIndex(higestZindex);
        dispatch(setActiveWindow(props.id));
      }}
      style={{
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        zIndex: zIndex,
        width: isMaximized ? "100vw" : preset.width,
        height: isMaximized ? "100vh" : preset.height,
        display: isMinimized ? "none" : "block",
      }}
      className={`absolute bg-white rounded-xl shadow-2xl overflow-hidden cursor-default ${
        activeWindow === props.id
          ? "bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] scale-[1]"
          : "bg-white/90 shadow-[0_10px_25px_rgba(0,0,0,0.18)] scale-[0.995]"
      }`}
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
        <span
          onClick={() => dispatch(minimizeWindow(props.id))}
          className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer"
        ></span>
        <span
          onClick={() => dispatch(toggleMaximize(props.id))}
          className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
        ></span>

        <p className="ml-4 text-sm font-medium text-gray-600">{props.title}</p>
      </div>

      {/* Body */}
      <div className="h-[calc(100%-40px)] w-full">{props.children}</div>
    </div>
  );
};

export default Window;
