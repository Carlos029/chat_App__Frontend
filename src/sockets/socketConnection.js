import { io } from "socket.io-client";


export const socketConnection = () => {
 
    return io(process.env.REACT_APP_BACKEND_API_URL, {
        'extraHeaders': {
            'x-token': localStorage.getItem('x-token')
        }
    })
}

