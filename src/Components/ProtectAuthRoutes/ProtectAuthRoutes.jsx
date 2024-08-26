import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

export default function ProtectAuthRoutes({children}) {

  const { userToken } = useContext(AuthContext)

  return (
    <>
      {
        !userToken ? children : <Navigate to="/" />
      }
    </>
  )
}
