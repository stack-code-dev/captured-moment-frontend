import Logo from '../assets/captured-moments-logo.svg'
import { ProfileInfo } from './Card/ProfileInfo'

export function Navabar() {


  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={Logo} alt="captured-moments-logo" className='h-11'/>

      <ProfileInfo />
    </div>
  )
}

