import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';

const Home = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="home-container">
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="carousel-item-img"
            src="http://127.0.0.1:8000/media/image/images_2.jpg" 
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Delicious Donuts</h3>
            <p>Soft, fresh, and perfect for any occasion.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-item-img"
            src="http://127.0.0.1:8000/media/image/images_3.jpg" 
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Freshly Baked Daily</h3>
            <p>Enjoy the taste of freshly baked treats every day.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-item-img"
            src="http://127.0.0.1:8000/media/image/images_4.jpg" 
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>For Every Mood</h3>
            <p>We have a flavor for every craving, from classic to adventurous!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section className="intro">
        <h1>Welcome to PonchykBoy 🍩</h1>
        <p>
          At PonchykBoy, we make dreams come true – soft, fluffy, sugar-dusted dreams.
          Our handcrafted donuts are made fresh daily with love and a sprinkle of magic.
          Whether you crave classic glazed or something wildly adventurous,
          we've got a flavor for every mood.
        </p>
      </section>

     
    </div>
  );
};

export default Home;
