import React, {useState, useEffect} from 'react';
import Img from 'react-image';

// export default class Header extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             key: '3eb3f8b5e93b49c844e8317fe0e4e210',
//             weatherRow: "",
//             weatherIcon: ""
//         }
//     }
//
//     componentDidMount() {
//         fetch(`http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=${this.state.key}&units=metric`)
//             .then((r) => r.json())
//             .then((r) => {
//                 this.setState({weatherIcon: `http://openweathermap.org/img/wn/${r.weather.icon}@2x.png`})
//                 const row = Object.keys(r.main).map((v) => {
//                     const result = v + ': ' + r.main[v];
//                     return result;
//                 }).join(' ')
//                 this.setState({weatherRow: row});
//             })
//     }
//
//     render() {
//         return (
//             <div className="header">
//                 <header className="navbar">
//                     <div id={'title'}>
//                         TodoList
//                     </div>
//                     <div id={'weather'}>
//                         {this.state.weatherRow}
//                         <Img src={this.state.weatherIcon}/>
//                     </div>
//                 </header>
//             </div>        )
//     }
// }

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
		<div className="header">
			<header className="navbar">
				<div id={'title'}>
					TodoList
				</div>
				<div id={'weather'}>
					<div className="temp">
						{weatherRow}
					</div>
					<Img className="icon" src={weatherIcon}/>
				</div>
			</header>
		</div>
	)
}
