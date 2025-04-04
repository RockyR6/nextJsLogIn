'use client'

import Link from 'next/link'
import { useState } from 'react'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'



const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {email, password, redirect: false})

      if(res.error){
        setError('Invalid Credentials')
        return
      }

      router.replace('dashboard')
    } catch (error) {
      console.log(`Error in login handleSubmit: ${error}`);
      
    }
  }

  return (
    <div className='grid place-items-center'>
        <div className='shadow-xl p-4 rounded-lg border-t-4 border-b-4 border-blue-400'>
            <h1 className='font-bold my-2'>Loging to your account</h1>
            <form className='flex flex-col gap-y-5 
            ' onSubmit={handleSubmit}>
                <input className='focus:outline-none' type="text" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input className='focus:outline-none' type="password"  placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <button className='bg-blue-400 rounded text-white cursor-pointer px-6 py-2'>Login</button>
                {
                  error && (<div className='bg-red-500 text-white w-fit py-1 px-2 rounded-md mt-2'>{error}</div>)
                }
            </form>
            <Link href={"/register"} className='text-sm mt-3 text-right'>Don't have an accout ? <span>Register</span></Link>
        </div>
     
    </div>
  )
}

export default LoginForm
