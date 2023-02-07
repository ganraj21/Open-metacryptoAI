import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HashLink } from "react-router-hash-link";
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    backgroundColor: "hsl(259, 20%, 18%)",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  bannerContent: {
    height: 650,
    display: "flex",
    flexDirection: "column",
    paddingTop: "66px 0 66px 0",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      height: "590px",
      padding: "19px 0 0 0",
    },
  },
  tagline: {
    paddingTop: "20px",
    display: "flex",
    height: "60%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  tagline_t: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.75rem",
      padding: "48px 0 0 0",
    },
  },
  subtitle: {
    color: "darkgrey",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: { padding: "15px" },
  },
  carousel: {
    height: "60%",
    display: "flex",
    alignItems: "center",
  },
  start_btn: {
    margin: "20px 0 0 0",
    gap: "10px",
    height: "45px",
    background: "gold",
    color: "#000",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",
            }}
            className={classes.tagline_t}
          >
            Open Meta CryptoAI
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
          <HashLink to="/#cryptoinfo">
            <Button
              variant="contained"
              color="primary"
              className={classes.start_btn}
            >
              Gets Started <ArrowForwardIcon />
            </Button>
          </HashLink>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
