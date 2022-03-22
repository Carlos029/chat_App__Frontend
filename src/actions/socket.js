import { types } from "../types/types"


export const openSocketConnection = (socket) => {
    return {
        type: types.setSocket,
        payload:{
            socket
        }
    }
}

export const closeSocketConnection = () => {
    return {
        type: types.closeSocket,
        payload:{
            socket:null
        }
    }
}