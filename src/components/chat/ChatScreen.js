import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { useForm } from '../../hooks/useForm';
import { useSockets } from '../../hooks/useSockets';


export const ChatScreen = () => {


  const { currentSocket } = useSelector(state => state.socket)
  const dispatch = useDispatch()
  const [users, messages,privateMessages] = useSockets()
  const [{ uid, message }, handleInputChange] = useForm({
    uid: "",
    message: ""
  })
  
  const { de:name, mensaje: privateMessage } = privateMessages || {}


  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleSendMsj = (e) => { //when the ENTER key is pressed, user send the written message 

    const { keyCode } = e


    if (keyCode !== 13) {
      return
    }

    if (message.length === 0) {
      return
    }

    currentSocket.emit('enviar-mensaje', { mensaje: message, uid })
  }

  return (
    <>

      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6">

            <h3>Send Message</h3>
            <hr />
            <p style={{opacity:"0.5"}}>Enter a user's uid if you want to send a private message</p>
            <input
              name="uid"
              type="text"
              className="form-control mb-2"
              value={uid}
              onChange={handleInputChange}
              placeholder="uid"
              autoComplete="off"
            />
            <input
              name="message"
              type="text"
              className="form-control mb-2"
              value={message}
              onChange={handleInputChange}
              onKeyUp={handleSendMsj}
              placeholder="message"
              autoComplete="off"
            />
            <h3>Users</h3>
            <hr />
            <ul>

              {

                users &&

                users.map((user, i) => {

                  const { nombre, uid } = user

                  return (
                    <li key={i}>
                      <h5 className='text-success'>{nombre}</h5>
                      <span className='fs-6 text-muted'><b>uid:</b> {uid}</span>
                    </li>
                  )
                })
              }

            </ul>

          </div>

          <div className="col-sm-6">
            <h3>Chat</h3>
            <hr />
            <ul >
              {
                messages &&

                messages.map((msj, i) => {

                  const { nombre, mensaje: message } = msj

                  return (
                    <li key={i}>
                      <h5 className='text-success'>{nombre}</h5>
                      <span className='fs-6 text-muted'>{message}</span>
                    </li>
                  )
                })
                
              }

              {

              privateMessages &&

                  <li>
                    <h5 className='text-danger'>Private message from {name}</h5>
                    <span className='fs-6 text-muted'>{privateMessage}</span>
                  </li>
              
              }

            </ul>
          </div>

        </div>

        <button className='btn-text btn-danger ' onClick={handleLogout}>logout</button>

      </div>

    </>
  )
}
