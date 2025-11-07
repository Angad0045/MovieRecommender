import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Shimmer_Movie_Page from "../Utils/Shimmer_Movie_Page";
import { BASE_URL } from "../Utils/Constants";

const MoviePage = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState();
  const [movieTrailer, setMovieTrailer] = useState();

  const FetchMovieDetails = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/movieRecommender/api/movie/details/ ${id}`,
        { withCredentials: true }
      );
      // console.log(res.data.data);
      setMovieDetail(res?.data?.data);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const FetchTrailerPath = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/movieRecommender/api/movie/trailer/ ${id}`,
        { withCredentials: true }
      );
      // console.log(res.data.data[0].key);
      setMovieTrailer(res.data.data[0].key);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    FetchMovieDetails();
    FetchTrailerPath();
  }, []);

  if (!movieDetail && !movieTrailer) {
    return <Shimmer_Movie_Page />;
  }

  return (
    <>
      <div className="bg-neutral-900 text-white min-h-screen w-screen pt-16 p-5 flex flex-col items-center">
        <div className="w-full flex flex-col md:grid md:grid-cols-10">
          <div className="md:col-span-4 lg:col-span-2 flex justify-center items-center">
            <img
              className="h-[400px] md:h-[300px] object-center"
              src={
                "https://image.tmdb.org/t/p/w500/" + movieDetail?.poster_path
              }
              alt={movieDetail?.title}
            />
          </div>
          <div className="mt-5 md:col-span-6 lg:col-span-8 px-1">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
              {movieDetail?.title}
            </h1>
            <div className="flex items-center text-sm md:text-xl mt-1">
              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400">
                <StarIcon fontSize="small" />
                <h3 className="font-semibold">
                  {Math.floor(movieDetail?.vote_average * 10) / 10}/10
                </h3>
                {/* Genre */}
                <h4 className="text-neutral-400">
                  | {movieDetail?.genres?.map((g) => g?.name).join(", ")}
                </h4>
              </div>
            </div>
            {/* Overview */}
            <h1 className="text-neutral-300 text-xl font-bold mt-5">
              Overview
              <div className="w-full border-t-2 border-neutral-700 my-2"></div>
            </h1>
            <p className="text-neutral-400 font-thin text-justify my-1">
              {movieDetail?.overview}
            </p>
            {/* Release Date */}
            <h5 className="text-neutral-400 mt-2">
              <span className="font-bold text-neutral-300">Release Date:</span>{" "}
              {movieDetail?.release_date}
            </h5>
            {/* Runtime */}
            <div className="flex gap-1">
              <h5 className="text-neutral-400">
                <span className="font-bold text-neutral-300">Runtime:</span>{" "}
                {Math.floor(movieDetail?.runtime / 60)}h{" "}
                {movieDetail?.runtime % 60}m
              </h5>
              <h5 className="text-neutral-500">({movieDetail?.runtime} min)</h5>
            </div>
          </div>
        </div>
        <div>
          {/* Trailer */}
          <div className="w-screen border-t-4 border-neutral-700 my-4"></div>
          <div className="px-5">
            <h1 className="text-2xl md:text-3xl font-bold">Trailer</h1>
            <iframe
              className="w-full mt-3 lg:mb-10 aspect-video relative"
              src={
                "https://www.youtube.com/embed/" +
                movieTrailer +
                "?&autoplay=0&mute=1"
              }
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
