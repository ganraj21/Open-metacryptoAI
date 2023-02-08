import Carousel from "./Carousel";
import { HashLink } from "react-router-hash-link";
import bg_banner from "../Images/banner2.jpg";
import styled from "styled-components";

export default function Banner() {
  return (
    <BannerDiv>
      <div className="bannercontent">
        <div className="tagline">
          <div className="tline" variant="h2">
            Open Meta CryptoAI
          </div>
          <div className="subtitle" variant="subtitle2">
            Get all the Info regarding your favorite Crypto Currency
          </div>
          <HashLink to="/#cryptoinfo">
            <div className="startbtn" variant="contained" color="primary">
              ` Gets Started <span>-</span>
            </div>
          </HashLink>
        </div>
        <Carousel />
      </div>
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
    padding-top: 20px;
    display: flex;
    height: 60%;
    flex-direction: column;
    justify-content: center;
    text-align: center
    align-items: center
    gap: 6px
  }
  .tline{
   font-weight: bold;
  margin-bottom: 15px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif;

  @media (max-width: 600px) {
    font-size: 2.75rem;
    padding: 48px 0 0 0;
  },
  }
  .subtitle{
    color: darkgrey;
  text-transform: capitalize;
  font-family: Montserrat;
  @media (max-width: 600px) {
    padding: 15px;
  }
  }

  .startbtn{
    margin: 18px 0 0 0;
    gap: 10px
    height: 45px
    background: gold
    color: #000
    &:hover {
      background-color: #9641da78
      color: #fff
      font-weight: 500,
    },
  }
`;
