import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#E9FCE9",
        }}
      >
        <Card sx={{ margin: "10px", padding: "10px" }}>
          <CardContent>
            <Stack spacing={2} alignItems={"center"}>
              <CheckCircleIcon
                sx={{ color: "green", width: "100px", height: "100px" }}
              />
              <Typography variant="h4">Payment Successfully!</Typography>
              <Typography
                variant="boby1"
                sx={{ maxWidth: "400px", textAlign: "center" }}
              >
                Thank you for subscribing! You now have full access to all
                premium features 🚀
              </Typography>
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/home")}
              >
                Go to Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SuccessPage;
