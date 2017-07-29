(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            login: login,
            register: register,
            logout: logout,
            checkAdmin: checkAdmin,
            checkLoggedIn: checkLoggedIn,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function login(username, password) {
            var url = "/api/assignment/login";

            var credentials = {username: username, password: password};

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/assignment/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/assignment/logout";

            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function checkAdmin() {
            var url = "/api/checkAdmin";

            return $http.get(url)
                .then(function (response) {
                    return respnse.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllUsers(username, password) {
            var url = "/api/assignment/user";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {

            var url = "/api/assignment/user?username=" + username + "&password=" + password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // for (var u in users) {
            //
            //     var user = users[u];
            //
            //     if (user.username === username && user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserById(userId) {

            var url = "/api/assignment/" + userId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {

            var url = "/api/assignment/user"
            // creating brand new instance because we're making a new user
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;

            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            // var user = users.find(function (user) {
            //     return user._id === userId;
            // })
            // var index = users.indexOf(user);
            // users.splice(index, 1);

            var url = "/api/assignment/user/" + userId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // MIGHT NEED TO WORK ON THIS --- MAKE IT SERVER-SIDE!
        function findUserByUsername(username) {
            // var user =  users.find(function (user) {
            //     return user.username === username;
            // });
            //
            // if (typeof user === 'undefined') {
            //     return null;
            // } else {
            //     return user;
            // }

            var url = "/api/assignment/graduate/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();