import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/Constants";
import { Bounce, toast } from "react-toastify";

const MovieCard = ({ id, poster_path, title, overview }) => {
  const navigate = useNavigate();

  const handleWatchNowClick = () => {
    navigate(`/movie/${id}`);
  };

  const handleAddWatchList = async () => {
    await axios.post(
      `${BASE_URL}/watchlist/addToWatchlist/${id}`,
      {
        posterPath: poster_path,
        name: title,
      },
      { withCredentials: true }
    );
    toast.success("Movie successfully added to watchlist!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          maxHeight: 550,
          position: "relative",
          "&:hover .overlay": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            objectFit: "cover",
          }}
          image={"https://image.tmdb.org/t/p/w500/" + poster_path}
          alt="Poster"
        />

        <CardContent
          className="overlay"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ flex: 1 }}
              onClick={handleWatchNowClick}
            >
              Watch Now
            </Button>
            <Button variant="outline" size="large" onClick={handleAddWatchList}>
              <AddIcon />
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: "10px",
              marginX: "5px",
            }}
          >
            {overview}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default MovieCard;
