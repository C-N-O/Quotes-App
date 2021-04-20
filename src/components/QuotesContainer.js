import React, { useState, useEffect, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import { connect } from 'react-redux';
import { fetchQuotes } from '../actions';
import Quote from './Quote';

const style = {
  color: 'red',
};

const QuotesContainer = ({ quotesData, fetchQuotes }) => {
  const MAX = quotesData.length;
  const [randomNum, setRandomNum] = useState(null);
  const [slideOn, setSlideOn] = useState(false);
  const btnRef = useRef(null);
  const intervalRef = useRef(null);
  const idleTimerRef = useRef(null);
  const homePageRef = useRef(null);
  const homePageRefAuthor = useRef(null);

  //use the useEffect to dispatch fetchUsers
  //An empty dependency array so fetchQuotes is dispatched only once
  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  //map through the data, passsing each element to the Quote component and adding them to our list
  const list = quotesData.map((el, index) => {
    return <Quote key={index} quote={el} />;
  });

  //when slide is started, get a random number between 0 and the Max number of items of our data
  const startSlide = () => {
    setSlideOn(true);
    intervalRef.current = setInterval(() => {
      setRandomNum(Math.floor(Math.random() * MAX) + 1);
    }, 6000);
    return () => {
      clearInterval(intervalRef.current);
    };
  };

  //Start or Stop slide when the button is clicked
  //Change the home page text while waiting for first quote
  const control = () => {
    if (slideOn === false) {
      if (homePageRef.current) {
        homePageRef.current.textContent = 'Quotes Loading...';
        homePageRefAuthor.current.innerText = 'Hang Tight 😎';
      }
      btnRef.current.style.backgroundColor = 'rgb(255, 64, 0)';
      btnRef.current.style.color = '#ffffff';
      setSlideOn(true);
      startSlide();
    } else {
      btnRef.current.style.transition = '0s ease-in';
      btnRef.current.style.backgroundColor = 'rgb(128, 255, 0)';
      btnRef.current.style.color = '#000000';
      clearInterval(intervalRef.current);
      setSlideOn(false);
    }
  };
  //called when the user becomes inactive for 10 seconds
  const onIdle = () => {
    btnRef.current.style.transition = '3s ease-out';
    btnRef.current.style.opacity = '0';
  };

  //called when the user becomes active again
  const onActive = () => {
    btnRef.current.style.transition = '3s ease-in';
    btnRef.current.style.opacity = '1';
  };

  //If we are waiting for data, display Loading
  //If we fail to fetch, display the error
  //otherwise the data was fetched successfully, we show the Home Page
  return quotesData.loading ? (
    <h2>Loading</h2>
  ) : quotesData.error ? (
    <h2>{quotesData.error}</h2>
  ) : (
    <div>
      <div className='quote'>
        {randomNum === null ? (
          <div className='firstSlide'>
            <h1 style={style} ref={homePageRef}>
              Quotes App
            </h1>
            <p ref={homePageRefAuthor}>by CliffDev</p>
          </div>
        ) : (
          <div>{list[randomNum]}</div>
        )}
      </div>

      {/* If the slide is off we show start button, otherwise show the stop button */}
      <button className='btn-start' ref={btnRef} onClick={control}>
        {slideOn === false ? 'START' : 'STOP'}
        {/* Using the idle timer library to watch for 10 seconds of inactivity. 10 seconds of inactvity and the onIdle fucntion is called */}
        {slideOn === true ? (
          <IdleTimer
            ref={idleTimerRef}
            timeout={10 * 1000}
            onIdle={onIdle}
            onActive={onActive}
          ></IdleTimer>
        ) : (
          clearTimeout(idleTimerRef.current)
        )}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quotesData: state.quotes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuotes: () => dispatch(fetchQuotes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotesContainer);
