'use client'

import {useSession} from 'next-auth/react'
import React from 'react'
import { signOut } from 'next-auth/react'

const UserInfo = () => {

  const {data: session} = useSession()
  return (
    <div className='flex flex-row justify-around items-center'>
      <div className='shadow-lg p-8 bg zinc-300/10 flex flex-col gap-2 my-8'>
        <div>
            Name: <span className='font-bold'>{session?.user?.name}</span>
        </div>
        <div>
            Email: <span className='font-bold'>{session?.user?.email}</span>
        </div>
      </div>
      <button className='bg-red-500 text-white font-bold p-3' onClick={() => signOut()}>Logout</button>
    </div>
  )
}

export default UserInfo
