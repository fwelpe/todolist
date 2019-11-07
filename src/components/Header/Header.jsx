import React, {useState, useEffect} from 'react';
import Img from 'react-image';
import openweatherUrl from "../../config/openweatherUrl";
import openweatherIconUrl from "../../config/openweatherIconUrl";

import './Header.css'

export default () => {
	const [weatherText, setWeatherText] = useState('');
	const [weatherIcon, setWeatherIcon] = useState('');

	useEffect(() => {
		fetch(openweatherUrl)
			.then((r) => r.json())
			.then((r) => {
				const row = r.main.temp + ' °C';
				setWeatherText(row);
				setWeatherIcon(openweatherIconUrl[0] + r.weather[0].icon + openweatherIconUrl[1]);
			})
	}, [])
	return (
		<div className="header navbar">
				<div id={'title'}>
					TodoList
				</div>
				<div id={'weather'}>
					<div className="temp">
						{weatherText}
					</div>
					<Img className="icon" src={weatherIcon}/>
				</div>
		</div>
	)
}
