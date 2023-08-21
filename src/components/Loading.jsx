import LoadingBoxes from "./LoadingBoxes";

const Loading = () => {
  return (
    <div className=" w-screen h-screen p-6 md:p-12">
      <div className=" w-1/6 h-14 bg-slate-800 mt-20 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 via-rose-100/20 from-transparent to-transparent bg-gradient-to-r animate-shimmer -translate-x-full" />
      </div>
      <LoadingBoxes />
    </div>
  );
};

export default Loading;
