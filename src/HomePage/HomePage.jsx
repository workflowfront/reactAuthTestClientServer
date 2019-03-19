import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions} from '../actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users} = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Добро пожаловать {user.fullName}!</h1>
                <p>Вы вошли на сайт</p>
                <h3>Все зарегистрированные ползователи gitHub:</h3>
                {users.loading && <em>Загружаем список пользователей...</em>}
                {users.error && <span className="text-danger">Ошибка: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.login + ' ' + user.repos_url}
                                {
                                    user.deleting ? <em> - Удаляем...</em>
                                    : user.deleteError ? <span className="text-danger"> - Ошибка: {user.deleteError}</span>
                                    : <span> - <a className="btn-link" onClick={this.handleDeleteUser(user.id)}>Удалить</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }

                <p>
                    <Link  className="btn-link" to="/login">Выйти</Link>
                </p>
            </div>


        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };