import burgerImage from '../assets/burger.png';

export default function Index() {
    return (
      <h1 id="zero-state">
          <img src={burgerImage} alt="Burger Icon" style={{ height: '150px', width: 'auto' }} // Maintain aspect ratio
          />
        <br></br>
        SunsOutBunsOut
      </h1>
    );
  }