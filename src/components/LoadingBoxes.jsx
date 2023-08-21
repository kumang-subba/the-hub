import { useEffect, useState } from "react";

const LoadingBoxes = () => {
  const [box, setBox] = useState([Array(1)]);
  useEffect(() => {
    const addBox = window.setTimeout(() => {
      if (box.length <= 5) {
        setBox([...box, Array(1)]);
      }
    }, 300);
    return () => window.clearTimeout(addBox);
  }, [box]);
  return (
    <div className=" flex mt-20 rounded-md relative overflow-hidden gap-2 [--items-per-screen:4] md:[--items-per-screen:5] ">
      {box.map((item, index) => {
        return (
          <div
            key={index}
            className={`h-32 flex-[0_0_calc(100%/var(--items-per-screen))] bg-slate-800 relative overflow-hidden`}
          >
            <div className="absolute inset-0 via-rose-100/20 from-transparent to-transparent bg-gradient-to-r animate-shimmer -translate-x-full" />
          </div>
        );
      })}
    </div>
  );
};

export default LoadingBoxes;
