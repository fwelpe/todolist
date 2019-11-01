import React, {useState, useEffect} from 'react';
import Img from 'react-image';

import './Header.css'

export default () => {
	const key = '3eb3f8b5e93b49c844e8317fe0e4e210';
	const [weatherRow, setWeatherRow] = useState('');
	const [weatherIcon, setWeatherIcon] = useState('');

	useEffect(() => {
		fetch(`http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=${key}&units=metric`)
			.then((r) => r.json())
			.then((r) => {
				const row = r.main.temp + ' °C'
				/*const row = Object.keys(r.main).map((v) => {      // old row
					const result = v + ': ' + r.main[v];
					return result;
				}).join(' ')*/
				setWeatherRow(row);
				setWeatherIcon(`http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`)
			})
	}, [])
	return (
		<div className="header navbar">
				<div id={'title'}>
					TodoList
				</div>
				<div id={'weather'}>
					<div className="temp">
						{weatherRow}
					</div>
					<Img className="icon" src={weatherIcon}/>
				</div>
		</div>
	)
}
