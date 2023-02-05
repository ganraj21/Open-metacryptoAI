import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    backgroundColor: "hsl(259, 20%, 18%)",
  },
  bannerContent: {
    height: 500,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    paddingTop: "20px",
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  tagline_t: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.75rem",
    },
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  start_btn: {
    margin: "20px 0 0 0",
    gap: "10px",
    height: "45px",
    background: "gold",
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
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.start_btn}
          >
            Gets Started <ArrowForwardIcon />
          </Button>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
