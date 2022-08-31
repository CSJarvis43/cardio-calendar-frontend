export default function useAuthorizedFetch(endpoint, method='GET', body=null) {

    return function() {
        return fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: body
        }).then(r => r.json())
    }
}