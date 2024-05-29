import React from 'react'
import user from '../data/user'


export default function UserProfile() {
  return (
    <div>Welcome {user.userName}

      this stores NAME, EMAIL, PASSWORD, Saved Collections
    </div>
  )
}
