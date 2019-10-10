import React, { useState } from 'react';

const NameForm = () => {
    const [todo, todoSet] = useState('');

    const handleChange = (event) => todoSet(event.target.value);

    return (
        <form>
            <label>
                Новая задача:
            <input type="text" value={todo} onChange={handleChange} />
            </label>
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default NameForm