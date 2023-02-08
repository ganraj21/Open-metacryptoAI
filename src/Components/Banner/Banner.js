import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "./Carousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HashLink } from "react-router-hash-link";
import { styled } from "@mui/system";
import bg_banner from "../Images/banner2.jpg";

const BannerDiv = styled("div")(({ theme }) => ({
  backgroundImage: `url(${bg_banner})`,
  backgroundColor: "hsl(259, 20%, 18%)",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "fill",
}));

const BannerContent = styled(Container)(({ theme }) => ({
  height: 650,
  display: "flex",
  flexDirection: "column",
  paddingTop: "66px 0 66px 0",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    height: "590px",
    padding: "19px 0 0 0",
  },
}));

const Tagline = styled("div")(({ theme }) => ({
  paddingTop: "20px",
  display: "flex",
  height: "60%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  gap: "6px",
}));

const Tline = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 15,
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.75rem",
    padding: "48px 0 0 0",
  },
}));
const Subtitle = styled(Typography)(({ theme }) => ({
  color: "darkgrey",
  textTransform: "capitalize",
  fontFamily: "Montserrat",
  [theme.breakpoints.down("sm")]: { padding: "15px" },
}));
const StartBtn = styled(Button)(({ theme }) => ({
  margin: "18px 0 0 0",
  gap: "10px",
  height: "45px",
  background: "gold",
  color: "#000",
  "&:hover": {
    backgroundColor: "#ffdf33",
    fontWeight: 500,
  },
}));

function Banner() {
  return (
    <BannerDiv>
      <BannerContent>
        <Tagline>
          <Tline variant="h2">Open Meta CryptoAI</Tline>
          <Subtitle variant="subtitle2">
            Get all the Info regarding your favorite Crypto Currency
          </Subtitle>
          <HashLink to="/#cryptoinfo">
            <StartBtn variant="contained" color="primary">
              Gets Started <ArrowForwardIcon />
            </StartBtn>
          </HashLink>
        </Tagline>
        <Carousel />
      </BannerContent>
    </BannerDiv>
  );
}

export default Banner;
