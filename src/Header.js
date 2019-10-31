import React, {useState, useEffect} from 'react';

const Header = () => {
    const key = '3eb3f8b5e93b49c844e8317fe0e4e210';
    const [ weatherRow, setWeatherRow ] = useState('');

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=${key}&units=metric`)
            .then((r) => r.json())
            .then((r) => {
                const row = Object.keys(r.main).map((v) => {
                    const result = v + ': ' + r.main[v];
                    return result;
                }).join(' ')
                setWeatherRow(row);
            })
    }, [])

    return (
        <div className="header">
            <header className="navbar"><div id={'weather'}>{weatherRow}</div><div id={'title'}>TodoList</div></header>
        </div>
    )
}

export default Header