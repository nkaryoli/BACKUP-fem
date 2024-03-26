import { ChangeEvent, FormEvent, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { User } from "../../../types/types";
import { styles } from "../../../style";
import GoogleButton from "./GoogleButton";

type LoginDto ={
  email: string;
  password: string;
}
const Login = () => {

  const [email,setEmail]= useState('');
  const [password, setPassword]= useState('');
  const[, setUser] = useLocalStorage('user', '');
  const navigate = useNavigate();
  const mutationFn = async ({email, password}: LoginDto) => authApi(email, password);

  const mutation = useMutation<User, Error, LoginDto>({
    mutationFn,
    onSuccess: (data) => {
      setUser(data)
      navigate('/')
    },
    onError: (error) => console.log('There has been an error',error)
  })

  const onChangeEmail= (e:ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value);
  }

  const onChangePassword= (e: ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value);
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    mutation.mutate({email,password})
  }

  return (
  <>
  <div className="flex-wrap h-fit py-[32px] max-w-[550px] flex justify-center rounded-[24px]  border-accent/10 border-2 z-10 bg-primary ">
    <div className="flex-1 flex-col justify-center items-center w-[520px] my-[25px] rounded-[10px] ">
    <form action="#" onSubmit={onSubmit} method="POST" className="flex flex-col items-center ">
      <div className="flex flex-col w-96 justify-center   ">
        <div className=" flex flex-col justify-center items-center">
        <img src="../../../../public/FemCodersClub-Logo.png" alt="logo femCodersClub" className="w-[120px]" />
        <h1 className={`${styles.headingForm} mb-8` }>¡Bienvenida!</h1>
        </div>
        <label htmlFor="email" className={`${styles.label}`}>Correo Electrónico</label>
        <input id="email" type="email" name="email" onChange={onChangeEmail} value={email} required className={`${styles.input} mt-[10px]`}  />
        
        <label htmlFor="password"  className={`${styles.label}`}>Contraseña</label>
        <input type="password" id="password" name="password" value={password} onChange={onChangePassword} required className={`${styles.input}`} />

        <button className={`${styles.primaryBtn} mt-[20px]`} type="submit">Iniciar Sesión</button>
        
                    <p className="w-full text-center mb-2">- ó -</p>   
                    <GoogleButton/>
                    <p className="mt-4 text-end text-sm text-contrast/70">
                        ¿No tienes cuanta todavia? <a href="/signup" className="font-semibold leading-6 text-tertiary hover:text-[#fd8c82]">Regístrate</a>
                    </p>
      </div>
   
      

    </form>
    </div>
  </div>
  </>
  )
}

export default Login;