
const baseUrl = process.env.REACT_APP_BACKEND_API_URL


//for backend request where i do not need a token, like for register a new user or a user is trying to login. so after those actions i will recive a token 
export const fetch_Without_Token = async(endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/api/${endpoint}`


    if (method === 'GET') {

        return fetch(url)
    } else {
        return await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
    }
}


//backend request where i check if the user has a JWT to procced with the request
export const fetch_With_Token = async (endpoint, data, method = "GET") => {

    const url = `${baseUrl}/api/${endpoint}`
    const token = localStorage.getItem('x-token') || ''  //verify if i already have a token in localStorage. if not, the backend has an validation, that will not let me continue 


    if (method = "GET") {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': "application/json",
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}