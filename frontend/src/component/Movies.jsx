import axios from "axios";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Shimmer_Home_Page from "../Utils/Shimmer_Home_Page";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { BASE_URL } from "../Utils/Constants";
import { useSelector } from "react-redux";

const Movies = () => {
  const user = useSelector((store) => store?.user);
  // console.log(user?.planType);

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [preferences, setPreferences] = useState({
    language: "en-US",
    sort_by: "popularity.desc",
    page: "1",
    include_adult: "false",
    with_genres: "",
  });
  const [userPlan, setUserPlan] = useState();
  const [upgradeMsg, setUpgradeMsg] = useState(false);

  const FetchMovies = async () => {
    const res = await axios.post(
      `${BASE_URL}/movieRecommender/api/movies/`,
      preferences,
      { withCredentials: true }
    );
    return res?.data?.data[0];
  };

  useEffect(() => {
    const loadInitialMovies = async () => {
      const results = await FetchMovies(preferences);
      setMovies(results);
    };
    loadInitialMovies();
    setUserPlan(user?.planType);
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      const results = await FetchMovies(preferences);
      setMovies(results);
    };
    loadMovies();
  }, [preferences]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ [name]: value });
  };

  const handleReset = () => {
    setPreferences({
      language: "en-US",
      sort_by: "popularity.desc",
      page: "1",
      include_adult: "false",
      with_genres: "",
    });
  };

  const handleAISearchButton = () => {
    setUpgradeMsg(true);
    setTimeout(() => {
      setUpgradeMsg(false);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col justify-center p-5">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-between md:justify-center items-center">
          <button
            className="bg-white w-[80%] py-2 rounded-2xl hover:bg-red-900 hover:text-white disabled:bg-neutral-600"
            onClick={
              userPlan === "free"
                ? handleAISearchButton
                : () => navigate("/movies/suggestions")
            }
          >
            Movie Suggestions Search with AI{" "}
            <AutoAwesomeIcon fontSize="small" />
          </button>
          {upgradeMsg && (
            <h1 className="absolute m-2 top-0 left-0 bg-white/70 p-2 rounded-xl">
              ℹ Upgrade to Premium to unlock Movie Suggestions Search with AI
            </h1>
          )}
          <button className="md:absolute text-white md:right-4 lg:right-24 hover:text-red-900">
            {filterOn ? (
              <FilterAltOffIcon
                fontSize="large"
                onClick={() => setFilterOn(!filterOn)}
              />
            ) : (
              <FilterAltIcon
                fontSize="large"
                onClick={() => setFilterOn(!filterOn)}
              />
            )}
          </button>
          {filterOn && (
            <div className="z-20 absolute bg-neutral-900/70 p-5 rounded-2xl right-0 md:right-4 lg:right-28  top-48 md:top-56 lg:top-60">
              <div className="flex justify-center items-center gap-2">
                {/* Genre Select */}
                <div className="min-w-[100px]">
                  <select
                    id="genre"
                    name="with_genres"
                    value={preferences.with_genres}
                    onChange={handleChange}
                    className="w-full text-white border-2 border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Genre</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                  </select>
                </div>

                {/* Sort Select */}
                <div className="min-w-[100px]">
                  <select
                    id="sort"
                    name="sort_by"
                    value={preferences.sort_by}
                    onChange={handleChange}
                    className="w-full  text-white border-2 border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popularity.desc">Popularity</option>
                    <option value="vote_average.asc">Rating</option>
                    <option value="release_date.desc">Latest</option>
                    <option value="release_date.asc">Oldest</option>
                  </select>
                </div>

                {/* Adult Select */}
                <div className="min-w-[120px] flex justify-center items-center gap-1">
                  <label
                    htmlFor="adult"
                    className="block text-sm font-medium text-gray-300"
                  >
                    18+
                  </label>
                  <select
                    id="adult"
                    name="include_adult"
                    value={preferences.include_adult}
                    onChange={handleChange}
                    className="w-full text-white border-2 border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="border border-gray-500 text-gray-200 mt-2 p-2 rounded-md hover:bg-gray-700 transition"
              >
                <RestartAltIcon />
              </button>
            </div>
          )}
        </div>
        <div className="mt-5 gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <MovieCard
                key={index}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                overview={movie.overview}
              />
            ))
          ) : (
            <Shimmer_Home_Page />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
