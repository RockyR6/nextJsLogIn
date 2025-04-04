
import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const LoginPage = async () => {

   const session = await getServerSession(authOptions)
  
    if(session) redirect('/dashboard')
  return (
    <div className='p-40'>
      <LoginForm/>
    </div>
  )
}

export default LoginPage
