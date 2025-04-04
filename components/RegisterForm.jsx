'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'


const RegisterForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name && !email && !password){
      setError('All fields are required')
      return;
    }

    try {
      //checking if user is exists
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email})
      })
      const {user} = await resUserExists.json()

      if(user){
        setError('User already exists')
        return;
      }

      //for new register user
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name, email, password})
      })

      if(res.ok){
        const form = e.target;
        form.reset()
        router.push('/')
      }
    } catch (error) {
      console.log(`Error in handleSubmit: ${error}`);
      
    }
  }

  return (
    <div className='grid place-items-center p-40'>
        <div className='shadow-xl p-4 rounded-lg border-t-4 border-b-4 border-blue-400'>
            <h1 className='font-bold my-2'>Register now</h1>
            <form className='flex flex-col gap-y-5 
            ' onSubmit={handleSubmit}>
                <input className='focus:outline-none' type="text"  placeholder='Full Name' onChange={e => setName(e.target.value)}/>
                <input className='focus:outline-none' type="text" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input className='focus:outline-none' type="password"  placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <button className='bg-blue-400 rounded text-white cursor-pointer px-6 py-2'>Register</button>
                {error && (<div className='bg-red-500 text-white w-fit py-1 px-2 rounded-md mt-2'>{error}</div>)}
                
            </form>
            <Link href={"/login"} className='text-sm mt-3 text-right'>Already have an accout ? <span>Login</span></Link>
        </div>
     
    </div>
  )
}

export default RegisterForm