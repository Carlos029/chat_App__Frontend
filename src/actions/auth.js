import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { types } from "../types/types"
import Swal from 'sweetalert2'
import { fetch_Without_Token, fetch_With_Token } from "../helpers/fetchBackend"


//Register a new User
export const startRegister = (name, email, password) => {

    return async (dispatch) => {
        const resp = await fetch_Without_Token('usuarios', { nombre: name, correo: email, password, rol: 'USER_ROLE' }, "POST") //the backend recives name and email in spanish
        const body = await resp.json()

        if (resp.ok) {

            const { usuario: { uid, nombre: name }, token } = body // the backend gives the user/name in spanish so i change it back to english

            localStorage.setItem('x-token', token) //recives the JWT and set it in the localStorage
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: uid,
                name: name
            }))

        } else {

            if (body.errors) {
                Swal.fire('Error', body.errors[0].msg, 'error')
                return
            }

            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startLogin = (email, password) => {

    return async (dispatch) => {
        const resp = await fetch_Without_Token('auth/login', { correo: email, password }, "POST") //the backend recives name and email in spanish
        const body = await resp.json()


        if (resp.ok) {

            const { usuario: { uid, nombre: name }, token } = body // the backend gives the user/name in spanish so i change it back to english

            localStorage.setItem('x-token', token)  //recives the JWT and set it in the localStorage
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: uid,
                name: name
            }))

        } else {
            if (body.errors) {
                Swal.fire('Error', body.errors[0].msg, 'error')
                return
            }
            Swal.fire('Error', body.msg, 'error')
        }
    }

}



export const startGoogleLogin = () => {

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)  //opens the google auth window
            .then(async ({ user }) => {

                const id_token = await user.getIdToken() // google token firebase gives to identify the user is indeed a google user
                const resp = await fetch_Without_Token('auth/google', { id_token }, 'POST')
                const body = await resp.json()

                if (resp.ok) {

                    const { usuario: { uid, nombre: name }, token } = body // the backend gives the user/name in spanish so i change it back to english

                    localStorage.setItem('x-token', token) //recives the JWT and set it in the localStorage
                    localStorage.setItem('token-init-date', new Date().getTime())

                    dispatch(login(
                        uid,
                        name
                    ))

                } else {
                    if (body.errors) {
                        Swal.fire('Error', body.errors[0].msg, 'error')
                        return
                    }

                    Swal.fire('Error', body.msg, 'error')
                }

            })
            .catch(err => {
                console.log('Error', err.message, 'error')  
            })

    }
}


export const startLogout = () => {
    return async (dispatch) => {

        const googleUser = firebase.auth().currentUser || null; // check if the user has signin with google so in the case of loging out, the firebase variable deletes the user's google information

        if (googleUser) {
            await firebase.auth().signOut();
        }

        localStorage.clear(); //deletes the information like the JWT from the local storage
        dispatch(logout())

    }
}




/* backend request where i check if the user has a JWT on every page reload, if it doesn't
 has one, the user is send to the login screen, if the user has one, the JWT is renew */
export const startChecking = () => {

    return async (dispatch) => {

        const resp = await fetch_With_Token("auth/renew")
        const body = await resp.json()

        if (resp.ok) {

            const { usuario: { uid, nombre: name }, token } = body // the backend gives the user/name in spanish so i change it back to english

            localStorage.setItem('x-token', token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login(
                uid,
                name
            ))
        } else {

            dispatch(checkingFinish())
        }
    }
}



//redux action that sets the new state
const checkingFinish = () => {
    return {
        type: types.checkingFinish
    }
}



//redux action that sets the new state
export const login = (uid, displayName) => {

    return {

        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}


//redux action that sets the new state
const logout = () => {
    return {
        type: types.logout,
    }
}