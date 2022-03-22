import { types } from "../types/types"

const initialState = {
    checking : true //value is true on every realod of the page, so it gives time to know if the user has a JWT
}


export const authReducer = (state = initialState, action) => {

    switch (action.type){

        case types.login:

        return{
            uid: action.payload.uid,
            name: action.payload.displayName,
            checking: false
        }

        case types.logout:

        return{
            checking: false
        }

        case types.checkingFinish:
            return {
                ...state,
                checking: false
            }

        default:
            break;

    }

    return state 

}