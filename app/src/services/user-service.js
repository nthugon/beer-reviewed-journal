userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService(token, $http, apiUrl) {

    const current = token.get();
    if (current) {
        $http
            .get(`${apiUrl}/auth/validate`)
            .catch(() => token.remove());
    }
    
    function credential(endpoint) {
        return (credentials) => {
            return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
            .then(result => {
                token.set(result.data.token);
            })
            .catch(err => {
                throw err.data; 
            });
        };
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var currentToken = token.get();
        var user = {};
        if (typeof currentToken !== 'undefined') {
            var encoded = currentToken.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    return {
        isAuthenticated() {
            return !!token.get();
        },
        logout() {
            token.remove();
        },
        isAdmin() {
            if (!!token.get()) {
                let currentUser = getUserFromToken();
                return currentUser.admin;
            }
        },
        getUserInfo() {
            if (!!token.get()) {
                let currentUser = getUserFromToken();
                return currentUser;
            }
        },
        signin: credential('signin'),
        signup: credential('signup')
    };
}
