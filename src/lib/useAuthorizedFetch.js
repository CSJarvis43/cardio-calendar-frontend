export default function useAuthorizedFetch(endpoint, method='GET') {

    return function(body=null) {
        return fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: method === 'GET' ? body : JSON.stringify(body)
        }).then(r => r.json())
    }
}