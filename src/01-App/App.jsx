import { useState } from 'react'
import "./App.scss"

import arrow from "../assets/images/icon-arrow.svg"

function App() {
    const [value , setValue] = useState("")

    return (
        <main>
            <header>
                <div className="IP_input_container">
                    <h1> IP Address Tracker </h1>

                    <form onSubmit={(e) => {e.preventDefault()}}> 
                        <div className="input-wrapper">
                            <input 
                                onChange={(e) => setValue(e.target.value)}
                                value={value}
                                type="text"
                                placeholder="Search for any IP address or domain"
                            />

                            <button type="submit">
                                <img src={arrow} alt="Submit"/>
                            </button>
                        </div>
                    </form>

                </div>

                <div className="IP_output_container"> 
                    <div className="ip_address">
                        <div>
                            <h2>IP ADDRESS</h2>
                            <p>{value}</p>
                        </div>
                        <div className="line"></div>
                    </div>


                    <div className="ip_address">
                        <div>
                            <h2>LOCATION</h2>
                            <p>Brooklyn, NY 10001</p>
                        </div>
                        <div className="line"></div>
                    </div>


                    <div className="ip_address">
                        <div>
                            <h2>TIMEZONE</h2>
                            <p>UTC-05:00</p>
                        </div>
                        <div className="line"></div>
                    </div>


                    <div className="ip_address">
                        <div>
                            <h2>ISP</h2>
                            <p>SpaceX Starlink</p>
                        </div>
                    </div>
                </div>

            </header>

            <div className="map">
            </div>

        </main>
    )
}

export default App
