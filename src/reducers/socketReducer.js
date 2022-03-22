import { types } from "../types/types";


const initialState = {
    currentSocket : null //value is true on every realod of the page, so it gives time to know if the user has a JWT
}

export const socketReducer = (state=initialState, action) => {

    switch (action.type) {

        case types.setSocket:

            return {
                currentSocket: action.payload.socket
            }

        case types.closeSocket:
            return {
                currentSocket: null
            }

        default:
            break;

    }

    return state;


}
