import axios from "axios";
import { BASE_URL } from "../Utils/Constants";
import { useEffect, useState } from "react";
import Shimmer_Home_Page from "../Utils/Shimmer_Home_Page";

const MyListPage = () => {
  const [watchlist, setWatchList] = useState([]);

  const FetchWatchList = async () => {
    const res = await axios.get(`${BASE_URL}/watchlist/getWatchlist`, {
      withCredentials: true,
    });
    console.log(res?.data?.watchlist);
    setWatchList(res?.data?.watchlist);
  };

  useEffect(() => {
    FetchWatchList();
  }, []);

  if (!watchlist) return <Shimmer_Home_Page />;

  return (
    <>
      <div className="bg-neutral-900 min-h-screen w-screen flex flex-col items-center">
        <h1 className="text-2xl md:text-5xl text-white text-center font-bold mt-10">
          My List
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watchlist.length > 0 ? (
            watchlist.map((movie) => (
              <div className="mx-5 my-10" key={movie._id}>
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + movie.posterPath}
                  alt=""
                />
              </div>
            ))
          ) : (
            <h1 className="absolute text-center text-4xl text-white inset-0 top-40">
              Watchlist is Empty...
            </h1>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default MyListPage;
