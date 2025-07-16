import { MetaFunction } from 'react-router';
import HomePage from './HomePage';


export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default HomePage;
