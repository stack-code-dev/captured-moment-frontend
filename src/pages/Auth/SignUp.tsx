import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/Input/PasswordInput";
import { FormEvent, useState } from "react";
import { validateEmail } from "../../utils/helpers";
import axios from "axios";
import { axiosInstance } from "../../api/axiosInstance";

export const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()

    if(!name) {
      setError("Please enter a valid email adrees")
      return
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email adrees")
      return
    }

    if(!password) {
      setError("Please enter the password")
      return
    }

    setError("")


    try{
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password
      })

      if(response.data && response.data.accessToken) {
        localStorage.setItem('cm:token', response.data.accessToken)
        navigate('/home')
      }
    } catch (error){
      if(axios.isAxiosError(error)) {
        if(error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        } else {
          setError("An unexpected error ocurred. Please try again.")
        }
      }
    }
  }

  return (
    <main className="h-screen bg-emerald-50 overflow-hidden relative">
      <aside className="login-ui-box right-10 -top-40 bg-emerald-500" />
      <aside className="login-ui-box bg-emerald-200 -bottom-40 right-1/2" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <section className="w-2/4 h-[90vh] flex items-start flex-col justify-end bg-[url('/images/floresta.png')] bg-cover bg-center rounded-lg p-10 z-50">
          <h4 className="text-5xl text-white font-semibold leading-[58px]">
            Embark on <br /> Your Journey
          </h4>
          <p className="text-[15px] text-white leading-6 pr-7 mt-4">
            Sign up now to begin capturing your adventures and preserving 
            unforgettable moments in your personal travel log.
          </p>
        </section>

        <section className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-emerald-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-semibold mb-7">
              SignUp
            </h4>

            <input 
              type="text" 
              placeholder="Full Name"
              className="input-box"
              value={name}
              onChange={({target}) => {
                setName(target.value)}
              }
            />

            <input 
              type="text" 
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({target}) => {
                setEmail(target.value)}
              }
            />
            
            <PasswordInput
              value={password} 
              onChange={({target}) => {
                setPassword(target.value)}
              }
              placeholder="password"
            />

            <p className="text-red-500 text-xs pb-1">{error}</p>

            <button
              type="submit"
              className="btn-primary bg-emerald-500 hover:bg-emerald-100 hover:text-emerald-500"
            >
              CREATE ACCOUNT
            </button>

            <p className="text-xs text-slate-500 text-center my-4">
              OR
            </p>

            <button
              type="submit"
              className="btn-primary btn-light text-emerald-500 hover:bg-emerald-500"
              onClick={() => {
                navigate('/login')
              }}
            >
              LOGIN
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
