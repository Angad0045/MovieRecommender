import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const FailurePage = () => {
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
        <Card sx={{ margin: "10px", padding: "20px" }}>
          <CardContent>
            <Stack spacing={2} alignItems={"center"}>
              <CancelIcon
                sx={{ color: "red", width: "100px", height: "100px" }}
              />
              <Typography variant="h4">Payment Failed!</Typography>
              <Typography
                variant="boby1"
                sx={{ maxWidth: "400px", textAlign: "center" }}
              >
                Oops! Payment failed 😕
              </Typography>
              <Button
                variant="text"
                color="error"
                onClick={() => navigate("/subscription")}
              >
                Try Again
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default FailurePage;
