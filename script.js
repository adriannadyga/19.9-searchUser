class App extends React.Component {
    constructor() {
        super();
        //inicjowanie stanu komponentu
        this.state = {
            searchText: '',
            users: []
        };
    }

    onChangeHandle(event) {
        //metoda zmieniająca stan searchText na taki jaki jest pod zdarzeniem zmiany inputa
        this.setState({searchText: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        //interfejs pozwalający pobrać zasoby z sieci
        fetch(url)
        //promise spełniony - od then trafia obiekt typu response przekształcany na obiekt json
            .then(response => response.json())
            .then(responseJson => this.setState({users: responseJson.items}));
    }

    render() {
        return (
            <div>
                <form onSubmit = {event => this.onSubmit(event)}>
                    <label htmlFor="searchText">Search by user name</label>
                    <input
                    type="text"
                    id="searchText"
                    onChange = {event => this.onChangeHandle(event)}
                    value = {this.state.searchText}
                    placeholder="username"/>
                </form>
                <UsersList users = {this.state.users}/>
            </div>
        );   
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key = {user.id} user={user}/>);
    }

    render() {
        return (
            <div className = "users">
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        const {avatar_url, html_url, login} = this.props.user;
        return (
            <div className="user">
                <img src={avatar_url} style={{maxWidth: '100px'}}/>
                <a href={html_url} target="_blank">{login}</a>
            </div>
        );
    }
}

ReactDOM.render (
    <App />,
    document.getElementById('root')
);