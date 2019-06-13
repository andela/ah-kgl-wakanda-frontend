import React from 'react';
import './Home.scss';
import SideBar from '../../Components/SideBar/SideBar';
import profileImage from '../../assets/images/man.jpg';

/**
 * Home component
 * @param {object} props
 * @returns {void}
 */
const Home = () => (
  <div>
    <div id="home" className="text-center">
      <SideBar
        user={{
          firstName: 'Karl',
          lastName: 'Musingo',
          username: 'karl143',
          posts: 21,
          followers: 345,
          following: 52,
          profileImage,
        }}
      />
      <div>
        <h1>
          {'title'}
          {'team'}
        </h1>
        <button className="button">Change to avengers</button>
      </div>
    </div>
  </div>
);

export default Home;
