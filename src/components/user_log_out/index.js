import React, {useContext} from 'react'
import './index.css'
import { AppContext } from '../../context/app_context'

const UserLogOut = () => {

    const { user } = useContext(AppContext);

    const handleLogout = () => {

    }

  return (
    <div className='user-logout'>
        <div>
            {user.name || "Guest"}
        </div>
        <div className="email">
            {user.email  || "Guest@guest.com"}
        </div>
        <button className="btn-sm" onClick={handleLogout}>
            LOG OUT
        </button>
    </div>
  )
}

export default UserLogOut