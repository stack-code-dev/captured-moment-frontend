import { useNavigate } from 'react-router-dom'
import Logo from '../assets/captured-moments-logo.svg'
import { ProfileInfo } from './Card/ProfileInfo'

interface UserInfoProps {
  created_at: string
  email: string
  fullName: string
  id: string
  password: string
  uptaded_at: string
}

interface NavbarProps {
  userInfo: UserInfoProps | null
}

export function Navabar({ userInfo }: NavbarProps) {
  const navigate = useNavigate()
  const isToken = localStorage.getItem('cm:token')
  const showProfileinfo = isToken && userInfo

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  } 

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={Logo} alt="captured-moments-logo" className='h-11'/>

      {showProfileinfo && <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />}
    </div>
  )
}

