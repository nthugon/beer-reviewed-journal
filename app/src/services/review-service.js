reviewService.$inject = ['$http', 'apiUrl'];

export default function reviewService($http, apiUrl) {
    return {
        get(id) {
            if(!id) return this.getAll();
            return $http.get(`${apiUrl}/reviews/${id}`)
                .then(res => res.data);
        },
        getAll() {
            return $http.get(`${apiUrl}/reviews`)
                .then(res => res.data);
        },
        getUserReviews() {
            return $http.get(`${apiUrl}/reviews/user`)
                .then(res => res.data);
        },
        remove(id) {
            return $http.delete(`${apiUrl}/reviews/${id}`)
                .then(res => res.data);
        },
        add(review) {
            return $http.post(`${apiUrl}/reviews`, review)
                .then(res => {
                    return res.data;
                });

        }
               
    };
}
