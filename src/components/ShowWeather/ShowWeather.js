import React from "react";

function ShowWeather(props) {
    console.log(props);
    return (
        <div>
            {props.haveInfo === false ? (
                <div>Search Something!</div>
            ) : (
                <>
                    <div className='current'>
                        Current Weather: {props.targetName}, {props.targetCountry}{" "}
                    </div>
                    <div className='current1'>
                        Temperature: {props.info.temp}
                        <br />
                        Feels like: {props.info.feels_like}
                        <br />
                        Lowest: {props.info.temp_min}
                        <br />
                        Highest: {props.info.temp_max}
                        <br />
                        Humidity: {props.info.humidity}
                    </div>
                </>
            )}
        </div>
    );
}
export default ShowWeather;