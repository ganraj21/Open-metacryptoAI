import Carousel from "./Carousel";
import { HashLink } from "react-router-hash-link";
import bg_banner from "../Images/banner2.jpg";
import styled from "styled-components";
import { Button, Container } from "react-bootstrap";

export default function Banner() {
  return (
    <BannerDiv>
      <Container>
        <div className="bannercontent">
          <div className="tagline">
            <h2 className="tline" variant="h2">
              Open Meta CryptoAI
            </h2>
            <div className="subtitle" variant="subtitle2">
              Get all the Info regarding your favorite Crypto Currency
            </div>
            <HashLink to="/#cryptoinfo" className="hashlinkdiv">
              <Button className="startbtn" variant="warning">
                Gets Started
                <span>
                  <i class="fas fa-sharp fa-solid fa-arrow-right"></i>
                </span>
              </Button>
            </HashLink>
          </div>
          <Carousel />
        </div>
      </Container>
    </BannerDiv>
  );
}

const BannerDiv = styled.div`
  background-image: url(${bg_banner});
  background-color: hsl(259, 20%, 18%);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: fill;
  margin:0;

  .bannercontent {
    height: 650px;
    display: flex;
    flex-direction: column;
    padding-top: 66px 0 66px 0;
    justify-content: space-around;
    @media (max-width: 600px) {
      height: 590px;
      padding: 19px 0 0 0;
    }
  },
  .tagline{
    display: flex;
    height: 60%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    text-align: center
    gap: 6px;
    align-items: center;
    @media (max-width: 600px) {
      height: 700px;
      // margin-left: 10px;
      // width:100%;
    }
  }
  .tline{
   font-weight: bold;
   margin-bottom: 15px;
   font-size: 3.75rem;
   font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif;

  @media (max-width: 600px) {
    font-size: 3rem;
    margin-left: 10px;
  },
  }
  .subtitle{
    color: darkgrey;
  text-transform: capitalize;
  font-family: Montserrat;
  @media (max-width: 600px) {
    padding: 15px;
    margin-left: -10px
    margin-left: 10px;
  }
  }

  .hashlinkdiv{
    @media (max-width: 600px) {
      width: 100%;
      margin-left: 23px;

    }

  }
  .startbtn{
    margin: 18px 0 0 0;
    width: 180px;
    height: 45px;
    font-size: 18px;
    gap: 10px;
    background:gold;
    span {
      margin-left :9px;
    }
    &:hover {
      background-color: #9641da78
      color: #fff
      font-weight: 500,
    },

  }
`;
