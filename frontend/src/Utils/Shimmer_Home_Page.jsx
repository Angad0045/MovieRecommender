const Shimmer_Card = () => {
  return (
    <>
      <div className="bg-neutral-800 h-[310px] w-[250px]"></div>
    </>
  );
};

const Shimmer_Home_Page = () => {
  const NoOfCards = 20;
  return (
    <>
      <div className="h-auto w-screen bg-neutral-900 flex justify-center items-center">
        <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(NoOfCards)].map((_, index) => (
            <Shimmer_Card key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shimmer_Home_Page;
