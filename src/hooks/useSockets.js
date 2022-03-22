import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { closeSocketConnection, openSocketConnection } from '../actions/socket';
import { socketConnection } from '../sockets/socketConnection';


export const useSockets = () => {

    const dispatch = useDispatch()
    const [users, setUsers] = useState([]) //users connected
    const [messages, setMessages] = useState([]) //all msj send to de chat
    const [privateMessages, setPrivateMessages] = useState() 


    useEffect(() => {

        const socket = socketConnection()

        socket.on('connect', () => {
            console.log('Sockets online')
            dispatch(openSocketConnection(socket)) //set the socket on the redux store so i can use in other places
        })

        socket.on('usuarios-conectados', (newUsers) => {  //recives info every time a user is connected
            setUsers(newUsers);
        })

        socket.on('recibir-mensajes', (newMessages) => {  //recives messages send from every user connected on the chat
            setMessages(newMessages);
        })

        socket.on('mensaje-privado', (newPrivateMsj) => { //recives private messages whenever a user set a user id on the uid input on the chat
            setPrivateMessages(newPrivateMsj)
        })


        return () => {


            socket.on('disconnect', () => {
                console.log('Sockets offline')
                dispatch(closeSocketConnection())
            })
            socket.disconnect()
        }
    }, [])


    return [users, messages,privateMessages]
}
