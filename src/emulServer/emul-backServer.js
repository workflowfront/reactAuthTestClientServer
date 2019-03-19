var users = JSON.parse(localStorage.getItem('users')) || [];
    
export function emulBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // эмуляция серверного вызова
            setTimeout(() => {

                // логин
                if (url.endsWith('/users/auth') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

console.log('params');
                    let filteredUsers = users.filter(user => {
                        console.log('params', params, params.password, user.password);
                        return user.fullName === params.fullName && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            fullName: user.fullName,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Некорректный пароль');
                    }

                    return;
                }

                // все users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        reject('Не авторизован');
                    }

                    return;
                }

                //получить юзера по id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // статус 200 OK
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // статус  401 не авторизован
                        reject('Не авторизован');
                    }

                    return;
                }


                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    let newUser = JSON.parse(opts.body);


                    let duplicateUser = users.filter(user => { return (user.fullName === newUser.fullName &&
                        user.userEmail === newUser.userEmail); }).length;
                    if (duplicateUser) {
                        reject('Юзер "' + newUser.fullName + '" дублируется');
                        return;
                    }

                    // храним нового юзера
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // статус 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // уничтожим юзера
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                   if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // статус 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // статус 401
                        reject('Не авторизован');
                    }

                    return;
                }

                //
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}