import { Styled } from 'remix-component-css-loader'
import sketch from './sketch.png';

const HomePage = () => {
  return (
    <Styled>
      <img src={sketch} alt="sketch" />
    </Styled>
  );
};

export default HomePage;