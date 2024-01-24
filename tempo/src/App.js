import { useState } from "react";
import "./Style.css";

function App() {
  const [city, setCity] = useState("Pesquisar");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=d5d42cfaa7344a32850154452242201&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-">
        {/* (navbar-expand-md) deixar a navbar um pouco mais expandida */}
        <a className="navbar-brand text-white" href="#top">
          <b> João Previsão do Tempo </b>
        </a>
      </nav>

      <main>
        <div className="jumbotron search-area">
          <h1>Verifique o tempo da sua cidade!</h1>
          <p className="lead">Digite o nome da sua cidade:</p>
        </div>
        
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="input-group">
              <input type="text" className="form-control" value={city} onChange={handleChange} />
              <div className="input-group-append">
                <button onClick={handleSearch} className="btn btn-primary btn-lg" type="button">
                  Pesquisar
                </button>
              </div>
            </div>
            {weatherForecast ? (
              <div className="mt-4">
                <div>
                  <img src={weatherForecast.current.condition.icon} alt="Weather Icon" />
                </div>
                <div>
                  <h3>Hoje o dia está?: {weatherForecast.current.condition.text}</h3>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;