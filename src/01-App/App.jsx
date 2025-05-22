import { useState, useEffect } from "react";
import Map from "../02-Map/Map.jsx";
import "./App.scss";

import arrow from "../assets/images/icon-arrow.svg";

function App() {
    const [inputValue, setInputValue] = useState("");

    const [key, setKey] = useState(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
            import.meta.env.VITE_API_KEY
        }&ipAddress=`
    );

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(key)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setData(json);
            })
            .catch((error) => { 
                alert("Something Went wrong");
                console.error("Fetch error:", error);
            });
    }, [key]);

    const input_handler = (e) => {
        e.preventDefault();
        let valid_ipaddress =
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
        let valid_domain = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,}$/;

        if (valid_ipaddress.test(inputValue)) {
            setKey(
                `https://geo.ipify.org/api/v2/country,city?apiKey=${
                    import.meta.env.VITE_API_KEY
                }&ipAddress=${inputValue}`
            );
        } else if (valid_domain.test(inputValue)) {
            setKey(
                `https://geo.ipify.org/api/v2/country,city?apiKey=${
                    import.meta.env.VITE_API_KEY
                }&domain=${inputValue}`
            );
        } else {
            alert("Invalid input");
        }
    };

    return (
        <main>
            <header>
                <div className="IP_input_container">
                    <h1> IP Address Tracker </h1>

                    <form onSubmit={input_handler}>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Search for any IP address or domain"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />

                            <button type="submit">
                                <img src={arrow} alt="Submit" />
                            </button>
                        </div>
                    </form>
                </div>

                {data && (
                    <div className="IP_output_container">
                        <div className="info-block line">
                            <h2>IP ADDRESS</h2>
                            <p>{data.ip}</p>
                        </div>

                        <div className="info-block line">
                            <h2>LOCATION</h2>
                            <p>{`${data.location.city}, ${data.location.region}`}</p>
                        </div>

                        <div className="info-block line">
                            <h2>TIMEZONE</h2>
                            <p>{data.location.timezone}</p>
                        </div>

                        <div className="info-block">
                            <h2>ISP</h2>
                            <p>{data.isp}</p>
                        </div>
                    </div>
                )}
            </header>

            {data && <Map lat={data.location.lat} lng={data.location.lng} />}
        </main>
    );
}

export default App;
