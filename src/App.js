import React, { useRef, useState } from "react";

function App() {
  const APIKey = "f4fcc118e3fb61e68fca2c8a95df9e90";
  const inputRef = useRef(null);
  const [apiData, setApidata] = useState(null);
  const [showWeather, setShowweather] = useState(null);

  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/2469/2469994.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/1779/1779887.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/3222/3222801.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910189.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/7687/7687079.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4161/4161256.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/2524/2524402.png",
    },
  ];

  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=imperial&appid=${APIKey}`;

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setApidata(null);
        if(typeof data.cod === typeof 404 || typeof data.cod === typeof 400) {
          setShowweather([
            {
              type: "Not Found",
              img: "https://www.freeiconspng.com/uploads/error-icon-28.png",
            },
          ]); 
        }
        setShowweather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApidata(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-center">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Location"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase outline-none"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://img.icons8.com/?size=512&id=vh31KMqhxPJn&format=png"
              alt="/"
              className="w-8"
            />
          </button>
        </div>
        <div className={`overflow-hidden 
        ${showWeather ? 'h-[27rem]' : 'h-0'}`}>
          {loading ? (
            <div className="grid place-items-center h-full">
              <img src='https://img.icons8.com/?size=512&id=107170&format=png' alt="/" className="w-[50%] mx-auto mb-2 animate-spin" />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + ", " + apiData?.sys.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="/"
                  className="w-52 mx-auto"
                />
                <h3 className="text-xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>
                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1843/1843544.png"
                        alt="/"
                        className="h-9 mt-1"
                      />
                      <h2 className="text-4xl font-extrabold">
                        {apiData?.main?.temp} &deg;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
