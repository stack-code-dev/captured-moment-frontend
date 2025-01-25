import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export const PasswordInput = ({ value, onChange, placeholder }: PasswordInputProps) => {
  const [isShawPassword, setIsShawPassword] = useState(false)
  const location = useLocation()
  
  const toggleShowPassword = () => {
    setIsShawPassword(!isShawPassword)
  }

  const iconColor = 
    location.pathname === '/login' ? 'text-primary' :
    location.pathname === '/signup' && 'text-emerald-500'

  return (
    <div className='flex items-center bg-violet-600/5 px-5 rounded mb-3'>
      <input 
        value={value}
        placeholder={placeholder || 'Password'}
        type={isShawPassword ? "text" : "password"}
        className='w-full text-sm bg-transparent py-3 mr-4 rounded outline-none'
        onChange={onChange}
       />

      {isShawPassword ? 
        <FaRegEye 
          size={22}
          className={`${iconColor} cursor-pointer`}
          onClick={() => toggleShowPassword()}
        />
       :
        <FaRegEyeSlash 
          size={22}
          className={`${iconColor} cursor-pointer`}
          onClick={() => toggleShowPassword()}
        />
      }
    </div>
  )
}
