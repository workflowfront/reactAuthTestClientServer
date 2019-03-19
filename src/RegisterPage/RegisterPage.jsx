import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullName: '',
                userEmail: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
console.log(123);
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.fullName && user.userEmail && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Регистрация</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.fullName ? ' has-error' : '')}>
                        <label htmlFor="fullName">Имя</label>
                        <input type="text" className="form-control" placeholder="Имя" name="fullName" value={user.fullName} onChange={this.handleChange} />
                        {submitted && !user.fullName &&
                            <div className="help-block">Имя</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.userEmail ? ' has-error' : '')}>
                        <label htmlFor="userEmail">Email</label>
                        <input type="text" className="form-control" placeholder="Email" name="userEmail" value={user.userEmail} onChange={this.handleChange} />
                        {submitted && !user.userEmail &&
                            <div className="help-block">Email</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" className="form-control" placeholder="Пароль" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Пароль</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Зарегистрироваться</button>
                        {registering  && <p>Один момент...</p>

                        }
                        <Link to="/login" className="btn btn-link">Авторизоваться</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };