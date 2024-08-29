import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import {data} from '../Data/starterData';

import fruits1 from '../Assets/EngineerPics/fruits1.png';
import fruits2 from '../Assets/EngineerPics/fruits2.png';
import fruits3 from '../Assets/EngineerPics/fruits3.png';
import fruits4 from '../Assets/EngineerPics/fruits4.png';
import fruits5 from '../Assets/EngineerPics/fruits5.png';
import fruits6 from '../Assets/EngineerPics/fruits6.png';
import fruits7 from '../Assets/EngineerPics/fruits7.png';
import fruits8 from '../Assets/EngineerPics/fruits8.png';
import fruits9 from '../Assets/EngineerPics/fruits9.png';
import fruits10 from '../Assets/EngineerPics/fruits10.png';

// note: we put the data in here, so that it can flow down into the child cards

const Home = () => {
  const fruitImages = [fruits1, fruits2,fruits3,fruits4,fruits5,fruits6,fruits7, fruits8,fruits9,fruits10];

  const [cityWeather, setCityWeather] = useState(data[0].favCity);
  const [showForm, setShowForm] = useState(false);
  const [allEngineers, setAllEngineers]= useState(data);
  const [profile, setProfile] = useState  (data[0]);
  const [formInput, setFormInput] = useState({
    handle: "",
    timeZone: "",
    favCity: "",
    favColor:"#401B4F",
    favTheme: "",
    favLang: "",
    favSnack: "",
    favMusic: "",
    imgSrc: ""
  });

  const updateProfile = (e,item) => {
  setProfile(item);
  let citySplit=item.favCity.split(",")[0];
  getWeather(citySplit);
  };


  const formResponseChange = (e) => {
    const value = e.target.value;
    setFormInput({ ...formInput, [e.target.name]: value });
  };

  async function getWeather(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dabebbc68ae77bbaaed25f75c2798265
    `);
    let cityData = await response.json();
    if (cityData.weather) {
      setCityWeather(cityData.weather[0].description);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    allEngineers.push(formInput);
    console.log(allEngineers);
    setAllEngineers(allEngineers);
    console.log(allEngineers);
    document.getElementById("#form")
    e.target.reset();
    setShowForm(false);     
  };

  const displayForm = () =>{
    setShowForm(true);
  }
  
  useEffect(() => {
    getWeather(profile.favCity);
  }, [profile]);

  return ( //JSX 
  
<div className="main-section">
      <Header />  
      <h1 className="headline-name">Our Engineers</h1>
      <div className= "card-wrapper">
      {allEngineers.map((item, index) => (
        <button  className ="card-button" onClick= {(event) => updateProfile(event,item)}>
        <Container>
          <Row>
            <Col xs={12} md={4} lg={12/5}>
              <Card 
                imgSrc = {index <= 9 ? fruitImages[index] : index > 9 && item.imgSrc === "../Images/fruits1.jpg" ? fruitImages[1] : fruitImages[2] }
                handle={item.handle}
                timeZone={item.timeZone}
                favColor={item.favColor}
                key={index}/>
              </Col>
            </Row>
          </Container>
        </button>
        ))}
    
        <button  className="add-btn" onClick={displayForm} >Add An Engineer</button>
      </div>
  


    <div className= "profile-wrapper">
        <h1 className ="heading-handle">{profile.handle}</h1>
        <div className="profile-details">
          <h3 className ="time profile-detail">Time Zone</h3>
          <p className="gap">Gap Provision</p>
          <h3 className="profile-answers">{profile.timeZone}</h3>
        </div>
        <div className="profile-details">
          <h3 className ="handle-color profile-detail">Favorite Color</h3>
          <p className="gap">Gap Provision</p>
          <h3 className="profile-answers" style={{ color: profile.favColor}}> &#9679;</h3>
        </div>
        <div className="profile-details">
          <h3 className ="handle-language profile-detail">Favorite Programming Language</h3>
          <p className="gap">Gap Provision</p>
          <h3 className="profile-answers">{profile.favLang}</h3>
        </div>
        <div className="profile-details">
          <h3 className ="handle-theme profile-detail">Favorite Coding Theme</h3>
          <p className="gap">Gap Provision</p>
          <h3 className="profile-answers">{profile.favTheme}</h3>
        </div>
        <div className="profile-details">
          <h3 className ="handle-snack profile-detail">Favorite Coding Snack</h3>
          <p className="gap">Gap Provision</p>
          <h3 className="profile-answers">{profile.favSnack}</h3>
        </div>
        <div className="profile-details">
          <h3 className ="handle-music profile-detail">Favorite Coding Music</h3>
          <p className="gap">Gap Provision</p>
          <h3 className="profile-answers">{profile.favMusic}</h3>
        </div>
        <div className="profile-details">
          <h3 className ="handle-weather profile-detail" >Favorite City’s Weather Today</h3><p className="gap">Gap Provision</p>
          <h3 className="profile-answers">{profile.favCity} has {cityWeather}</h3>
        </div>
    </div>
          {showForm ? (
        <div className="form-wrapper">
          <h1 className ="onboarding">Engineer Onboarding</h1>

        <form id="form" onSubmit={handleSubmit}>
          <div className="handle-input">
            <label htmlFor="handleName" className="named-boxes-labels">Your handle/ name: </label>
            <input className="onboarding-dropdown-boxes named-boxes" type="text" name="handle" placeholder="Enter text" value={formInput.handle}
            onChange={(e) => formResponseChange(e)} required>
            </input>
          </div>
          <div className="timezone-input">
            <label className="named-boxes-labels">Please select: </label>
            <select className="onboarding-dropdown-boxes named-boxes" name="timeZone" placeholder="text" value={formInput.timeZone} onChange={(e) => formResponseChange(e)} >
              <option value= "">Time Zone</option>
              <option value="Hawaiian-Aleutian Time">Hawaiian-Aleutian Time Zone (HDT/HST/HT)</option>
              <option value="Alaskan-Yukon Time ">Alaskan-Yukon Time Zone (AKDT/AKST, YDT/YST)</option>
              <option value="Pacific Time">Pacific Time Zone (PDT/PST/PT)</option>
              <option value="Mountain Time ">Mountain Time Zone (MDT/MST/MT)</option>
              <option value="Central Time ">Central Time Zone (CDT/CST/CT)</option>
              <option value="Eastern Time  ">Eastern Time Zone (EDT/EST/ET)</option>
            </select>
          </div>
          <div className="color-input">
            <label className="named-boxes-labels">Favorite Color: </label>
            <input  className="color-bar onboarding-dropdown-boxes named-boxes" type="color"  name="favColor" value={formInput.favColor} onChange={(e) => formResponseChange(e)}></input>
          </div>
        <select className="onboarding-dropdown-boxes" name="favLang" placeholder=""  value={formInput.favLang} onChange={(e) => formResponseChange(e)}>
          <option value="" >Programming Language</option>
          <option value="HTML">HTML</option>
          <option value="Css">Css</option>
          <option value="Jquery">JQuery</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
        </select>
        <select className="onboarding-dropdown-boxes" name="favTheme" value={formInput.favTheme} onChange={(e) => formResponseChange(e)}>
          <option value="" >Coding Theme</option>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
        <select className="onboarding-dropdown-boxes" name="favSnack" value={formInput.favSnack} onChange={(e) => formResponseChange(e)}>
          <option value="" >Coding Snack</option>
          <option value="Bitter">Something Bitter</option>
          <option value="Salty">Something Salty</option>
          <option value="Sour">Something Sour</option>
          <option value="Sweet">Something Sweet</option>
          <option value="Umami">Something Umami</option>
          <option value=" combination">Something that's a combination of the above</option>
          <option value="None of the above">None of the above</option>
        </select>
        <select className="onboarding-dropdown-boxes" name="favMusic" value={formInput.favMusic} onChange={(e) => formResponseChange(e)} >
          <option value="" className="music-option">Coding Music</option>
          <option value="Vocals only" className="music-option">Vocals only: prefer music which only features (a) vocalist(s)</option>
          <option value="Instrumental only" className="music-option">Instrumental only: prefer instrumental music without lyrics</option>
          <option value="Vocals + Instrumental" className="music-option">Vocals + Instrumental: prefer music containing both vocals and instruments</option>
          <option value="No music" className="music-option">No music: prefer the melodic tune of my own thoughts and keyboard clicks</option>
        </select>
        <select className="onboarding-dropdown-boxes" name="favCity" value={formInput.favCity} onChange={(e) => formResponseChange(e)}>
          <option value="" >Favorite City</option>
          <option value="Los Angeles, California">Los Angeles, California</option>
          <option value="San Francisco, California">San Francisco, California</option>
          <option value="Portland, Oregon">Portland, Oregon</option>
          <option value="Seattle, Washington">Seattle, Washington</option>
          <option value="Denver, Colorado">Denver, Colorado</option>
          <option value="Tuscon, Arizona">Tuscon, Arizona</option>
          <option value="Austin, Texas">Austin, Texas</option>
          <option value="Chicago, Illinois">Chicago, Illinois</option>
          <option value="Nashville, Tennessee">Nashville, Tennessee</option>
          <option value="New Orleans, Louisiana">New Orleans, Louisiana</option>
          <option value="Orlando, Florida">Orlando, Florida</option>
          <option value="Atlanta, Georgia">Atlanta, Georgia</option>
          <option value="New York, New York">New York, New York</option>
          <option value="Honolulu, Hawaii">Honolulu, Hawaii</option>
          <option value="Anchorage, Alaska">Anchorage, Alaska</option>
          <option value="Tallinn, Estonia">Tallinn, Estonia</option>
        </select>
          <div className="image-form-wrapper" >
            <div className="fruits1-choice">
              <img className="fruit-image-form" src={fruits1} alt="fruit"  />
              <input
              className="form-check-input"
              type="radio"
              name="imgSrc"
              value="../Images/fruits1.jpg" onChange={(e) => formResponseChange(e)}/>
            </div>
            <div className="fruits2-choice">
              <img  className="fruit-image-form" src={fruits2} alt="fruit"  />
              <input
              className="form-check-input"
              type="radio"
              name="imgSrc"
              value="../Images/fruits2.jpg" onChange={(e) => formResponseChange(e)}/>
            </div>
          </div>
          
            
          <button className="add-engineer" type="submit">
            
            Add Engineer
          </button> 
        </form>
      
    </div>) : null }
    <div className="footer-wrapper">
      <Footer/>
    </div> 
</div>
  );
}

export default Home;








//   return (
// 	<div>
//     {Header}
//     <Header/>  
//       <h1>Our Engineers</h1>
//     {Card}
//     <div className= "card-wrapper">
//       {data.map((item, index) => (
//         <Card
//           imgSrc={fruitImages[index]}
//           handle={item.handle}
//           timeZone={item.timeZone}
//           favColor={item.favColor}
//           key={index}
//         />
//       ))}
//     </div>
//     {Footer}
//   </div>
//   );
// }
// export default Home;