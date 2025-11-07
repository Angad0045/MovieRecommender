const Shimmer_Movie_Page = () => {
  return (
    <>
      <div className="h-screen w-screen bg-neutral-900 pt-16 p-5 flex flex-col items-center">
        <div className="bg-neutral-700 w-full flex flex-col md:grid md:grid-cols-10">
          <div className="bg-neutral-800 h-[400px] md:h-[300px] md:col-span-4 lg:col-span-2 flex justify-center"></div>
          <div className="bg-neutral-800 ml-2 md:col-span-6 lg:col-span-8 flex flex-col justify-center items-center px-5">
            <div className="h-[70px] w-full bg-neutral-700 my-3"></div>
            <div className="h-[70px] w-full bg-neutral-700 my-3"></div>
            <div className="h-[70px] w-full bg-neutral-700 my-3"></div>
          </div>
        </div>
        <div className="w-screen border-t-4 border-neutral-700 my-4"></div>
        <div className="bg-neutral-800 w-full">
          <div className="h-[400px] overflow-hidden "></div>
        </div>
      </div>
    </>
  );
};

export default Shimmer_Movie_Page;
