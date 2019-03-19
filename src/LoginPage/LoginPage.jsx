import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);


        this.props.dispatch(userActions.logout());

        this.state = {
            fullName: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { fullName, password } = this.state;
        const { dispatch } = this.props;
        if (fullName && password) {
            dispatch(userActions.login(fullName, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { fullName, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Авторизация</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !fullName ? ' has-error' : '')}>
                        <label htmlFor="fullName">Имя</label>
                        <input type="text" className="form-control" placeholder="Имя" name="fullName" value={fullName} onChange={this.handleChange} />
                        {submitted && !fullName &&
                            <div className="help-block">Имя</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" className="form-control" name="password" placeholder="Пароль" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Пароль</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Авторизация</button>
                        {loggingIn
                        && <p>Один момент...</p> }
                        <Link to="/register" className="btn btn-link">Зарегистрироваться</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 