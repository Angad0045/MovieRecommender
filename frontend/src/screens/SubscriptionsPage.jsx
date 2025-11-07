const SubscriptionsPage = () => {
  return (
    <>
      <div className="relative w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-6xl lg:text-7xl text-red-900 font-black mb-2">
          Our Subscription Plans
        </h1>
        <h3 className="text-xl md:text-3xl text-neutral-200 font-bold mb-7 md:mb-10">
          Clear & Fair Pricing for Everyone
        </h3>
        <div className="w-full md:w-3/4 lg:w-1/2 h-1/2 py-5 px-5 md:px-10 gap-3 md:gap-5 grid grid-cols-4">
          <div className="col-span-2 bg-neutral-800 flex flex-col justify-center items-center rounded-xl border-2 border-neutral-700 hover:border-4 hover:border-neutral-500">
            <h1 className="mb-2 text-4xl md:text-5xl text-neutral-200 font-black">
              Free
            </h1>
            <h1 className="text-5xl md:text-6xl text-white font-black mb-5">
              0$
            </h1>
            <a href="http://localhost:8080/payment/subscribe?plan=free">
              <button className="bg-red-900 text-neutral-300 font-bold py-2 md:py-3 px-5 md:px-10 rounded-2xl md:rounded-3xl hover:text-white mb-3">
                Get Started!
              </button>
            </a>
            <div className="text-center md:text-lg text-neutral-300 font-semibold">
              <h4 className="text-green-600">✔️ All Content</h4>
              <h4 className="text-green-600">✔️ Watch on TV or Laptop</h4>
              <h4 className="text-red-500">❌ Ads Free</h4>
              <h4 className="text-red-500">❌ No AI Recommender</h4>
            </div>
          </div>
          <div className="col-span-2 bg-neutral-800 flex flex-col justify-center items-center rounded-xl border-2 border-neutral-700 hover:border-4 hover:border-neutral-500">
            <h1 className="mb-2 text-3xl md:text-5xl text-neutral-200 font-black">
              Premium
            </h1>
            <h1 className="text-5xl md:text-6xl text-white font-black mb-5">
              9.9$
            </h1>
            <a href="http://localhost:8080/payment/subscribe?plan=premium">
              <button className="bg-red-900 text-neutral-300 font-bold py-2 md:py-3 px-5 md:px-10 rounded-2xl md:rounded-3xl hover:text-white mb-3">
                Get Started!
              </button>
            </a>
            <div className="text-center md:text-lg text-neutral-300 font-semibold">
              <h4 className="text-green-600">✔️ All Content</h4>
              <h4 className="text-green-600">✔️ Watch on TV or Laptop</h4>
              <h4 className="text-green-600">✔️ Ads Free</h4>
              <h4 className="text-green-600">✔️ AI Recommender</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsPage;
