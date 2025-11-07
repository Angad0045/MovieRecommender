const express = require("express");
const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");
const { userAuth } = require("../Middlewares/userAuth");
const movieRouter = express.Router();

movieRouter.post("/api/movies", async (req, res) => {
  try {
    const userPrefs = req?.body;

    const defaultParams = {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
    };

    const params = { ...defaultParams, ...userPrefs };

    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`,
        },
      }
    );

    let movieslist = [response?.data?.results];
    // console.log(movieslist) || [];

    res.status(200).json({
      data: movieslist,
    });
  } catch (err) {
    console.error("Global API Error:", err);

    let errorMessage = "An unexpected server error occurred.";
    if (axios.isAxiosError(err)) {
      errorMessage = `External API connection failed: ${err.message}`;
    }

    res.status(500).json({
      error: errorMessage,
    });
  }
});

movieRouter.post("/api/movie/details/:id", async (req, res) => {
  try {
    const { id } = req?.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`,
        },
      }
    );
    let movieDetails = response?.data;
    res.status(200).json({
      data: movieDetails,
    });
  } catch (err) {
    console.error("Global API Error:", err);

    let errorMessage = "An unexpected server error occurred.";
    if (axios.isAxiosError(err)) {
      errorMessage = `External API connection failed: ${err.message}`;
    }

    res.status(500).json({
      error: errorMessage,
    });
  }
});

movieRouter.post("/api/movie/trailer/:id", async (req, res) => {
  try {
    const { id } = req?.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`,
        },
      }
    );
    // console.log(response?.data?.results);
    let movieTrailer = response?.data?.results;
    res.status(200).json({ data: movieTrailer });
  } catch (err) {
    console.error("Global API Error:", err);

    let errorMessage = "An unexpected server error occurred.";
    if (axios.isAxiosError(err)) {
      errorMessage = `External API connection failed: ${err.message}`;
    }

    res.status(500).json({
      error: errorMessage,
    });
  }
});

movieRouter.post("/api/movies/suggestions", async (req, res) => {
  try {
    const userInput = req?.body?.prompt;
    // 1. Input Validation
    if (!userInput || typeof userInput !== "string" || userInput.length < 5) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'prompt' in request body." });
    }

    // --- TMDB CALL Service Function ---
    const FetchMoviesFromTMDB = async (movieTitle) => {
      const cleanedTitle = movieTitle.trim().replace(/^['"]|['"]$/g, "");

      if (!cleanedTitle) {
        throw new Error("Empty movie title after cleaning");
      }

      const response = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: cleanedTitle,
          // include_adult: "false",
          // language: "en-US",
          // page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`,
        },
        timeout: 5000,
      });
      return response?.data?.results[0] || null;
    };

    // --- GEMINI CALL ---
    const geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const promptWithInstruction = `Based on the following user input, provide a list of 5 relevant movie titles. Respond ONLY with a valid JSON array of strings, like this: ["Movie A", "Movie B", "Movie C", "Movie D", "Movie E"]. 
    User Input: "${userInput}"`;

    const aiResponse = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptWithInstruction,
    });

    const rawText = aiResponse.text.trim();
    console.log("Gemini Raw Output:", rawText);

    // 2. Robust JSON Parsing
    let movieList = [];
    try {
      movieList = JSON.parse(rawText);
      if (!Array.isArray(movieList)) {
        throw new Error("Parsed result is not an array.");
      }
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", e);
      return res.status(500).json({
        error: "AI failed to generate a valid movie list. Please try again.",
      });
    }

    // --- CALLING TMDB TO GET MOVIE DETAILS ---
    const fetchPromises = movieList.map((movie) =>
      FetchMoviesFromTMDB(movie).catch((err) => {
        // Catch and log individual fetch errors but don't rethrow
        console.warn(
          `Failed to fetch data for movie "${movie}": ${err.message}`
        );
        return { status: "rejected", reason: err.message, movieTitle: movie };
      })
    );

    // 3. Use Promise.allSettled for Resilience
    const results = await Promise.allSettled(fetchPromises);

    const successfulMovies = results
      .filter(
        (result) => result.status === "fulfilled" && result.value !== null
      )
      .map((result) => result.value);

    const failedMovies = results
      .filter(
        (result) =>
          result.status === "rejected" ||
          (result.status === "fulfilled" && result.value === null)
      )
      .map(
        (result) =>
          result.reason ||
          (result.value === null ? "No match found on TMDB" : "Unknown error")
      );

    console.log("Successful TMDB Results:", successfulMovies);
    console.log("Failed TMDB Lookups:", failedMovies);

    // 4. Send Cleaned Success Response
    res.status(200).json({
      data: successfulMovies,
      metadata: {
        totalRequested: movieList.length,
        totalSuccessful: successfulMovies.length,
        failedLookups: failedMovies,
      },
    });
  } catch (err) {
    console.error("Global API Error:", err);

    // 5. Improved Error Messages
    let errorMessage = "An unexpected server error occurred.";
    if (axios.isAxiosError(err)) {
      errorMessage = `External API connection failed: ${err.message}`;
    }

    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV !== "production" ? err.message : undefined, // Only expose details in non-prod environment
    });
  }
});

module.exports = movieRouter;
