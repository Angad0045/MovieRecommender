import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../Utils/Constants";
import MovieCard from "../component/MovieCard";
import { Box, CircularProgress } from "@mui/material";

const AISearchPage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSearchResult, setAISearchResult] = useState([]);

  const handleAISearch = async () => {
    console.log(prompt);
    setLoading(true);
    const res = await axios.post(
      `${BASE_URL}/movieRecommender/api/movies/suggestions`,
      { prompt: prompt },
      { withCredentials: true }
    );
    console.log();
    setAISearchResult(res?.data?.data);
    setPrompt("");
    setLoading(false);
  };
  return (
    <>
      <div className="w-screen min-h-screen text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute bg-neutral-900 inset-0 -z-10">
          <div className="mix-blend-overlay">
            {/* <img
              className="w-full min-h-screen object-cover object-center mix-blend-overlay bg-neutral-700"
              src="AISearchPageBg.jpg"
              alt="Poster"
            /> */}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="px-7 md:px-20 mt-20 text-center text-red-800 text-2xl md:text-4xl lg:text-5xl font-black">
            Search with AI : It is not finding information; it is the discovery
            of insight.
          </h1>
          <div className="mt-10 relative w-3/4 lg:w-1/2 h-14 flex justify-center items-center">
            <input
              className="bg-neutral-600/50 text-neutral-400 w-full h-full p-5 rounded-2xl focus:outline-none border-2 border-transparent focus:border-2 focus:border-red-800"
              type="text"
              value={prompt}
              placeholder="Enter Prompt"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="absolute right-5 hover:text-red-800"
              onClick={handleAISearch}
            >
              <SearchIcon fontSize="large" />
            </button>
          </div>
          {loading && (
            <div className="mt-10 flex justify-center items-center gap-3 text-red-900">
              <h1 className="text-3xl font-bold">Generating...</h1>
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
              </Box>
            </div>
          )}
          {aiSearchResult && (
            <div className="my-10 p-3 gap-2 md:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {aiSearchResult.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  overview={movie.overview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AISearchPage;
