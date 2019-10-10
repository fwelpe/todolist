import React from 'react';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            l: 'root',
            p: 'ewe4',
            req: 'insert into todolist (todo) values ("' + this.state.value + '")'
        }

        fetch('http://95.165.129.236:8080/r.php', {
            headers: {
                'Accept': '*',
                'Content-Type': '*'
            },
            method: "POST",
            // dataType: 'json',
            responseType:'application/json',
            mode: 'no-cors',
            body: JSON.stringify(data)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Новая задача:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}

export default NameForm