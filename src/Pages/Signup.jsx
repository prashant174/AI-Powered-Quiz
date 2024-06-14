import React, { useContext, useState } from 'react'
import {useSpring} from '@react-spring/web'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Hourglass } from 'react-loader-spinner'
import {Button, Container, Form, Input, InputWrapper, TogglePasswordButton} from '../Styled/styled'
import { GlobalStyles } from '../Componants/GlobalStyles'
import { GoogleLogin } from '@react-oauth/google';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../context/Authcontext'
import ParticleBackground from '../Componants/ParticleBackground'

const Signup = () => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading, setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const {login}=useContext(AuthContext)
    const navigate=useNavigate()
    const formProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            if(name===''||email===''||password===''){
                toast.error('Fill all credentials first')
            }
            else{
                setLoading(true)
            const res=await axios.post('https://codeconverter1.onrender.com/signup',{name,email,password})
            if(res.data){
              if(res.data.msg==="OTP sent Successfully") setIsOtpSent(true)
                toast(res.data.msg)
               
                setLoading(false) 
            }else{
              toast.error('Something went wrong')
            }
           
            }
           
        } catch (error) {
          toast.error(error.response.data.msg);
            console.error('Signup failed:', error)
        }

    }
    

    const handleVerifyOtp=async(e)=>{
      e.preventDefault();
      try {
        setLoading(true)
        const res = await axios.post('https://codeconverter1.onrender.com/verify-otp',{email,otp});
        // localStorage.setItem('token', res.data.token);
        toast.success(res.data.msg);
        navigate("/login")
        setLoading(false)
       
      } catch (err) {
        toast.error(err.response.data.msg);
        setLoading(false)
      }
    }


    const handleGoogleSuccess=async(response)=>{
      
      try {
        const { credential } = response;
      
          const decoded = jwtDecode(credential);
          // console.log("testing",decoded );
          // setGoogleToken(decoded)
          signupWithGoogle(decoded)
      } catch (error) {
        toast.error('Google login failed')
      }
    }

 

    const signupWithGoogle=async(decode)=>{
      // e.preventDefault();
      try {
        const {name,email,sub}=decode
        // console.log('data aya kya',name,email,sub)
        const res=await axios.post('https://codeconverter1.onrender.com/googleAuth',{name,email,password:sub})
        if(res.data.msg==='user already exists'){
          const resl= await axios.post('https://codeconverter1.onrender.com/login',{email,password:sub})
          console.log(resl.data.msg)
          login(resl.data)
          toast(resl.data.msg)
          navigate("/")
        }else{
          login(res.data)
          toast(res.data.msg)
          navigate('/')
        }

        console.log(res.data.msg)
      } catch (error) {
        toast.error('Google login failed try other method')
      }
    }


  return (
   <>
   <ParticleBackground/>
   <GlobalStyles/>

<Container>
    
    <Form initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} style={formProps} onSubmit={isOtpSent? handleVerifyOtp: handleSubmit}>
        <h2>Signup</h2>
        <Input
          type="text"
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWrapper>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TogglePasswordButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword?<FaEyeSlash/>:<FaEye/>}
        </TogglePasswordButton>
        </InputWrapper>

        {isOtpSent&&(
           <Input
           type="password"
           placeholder="Your Otp..."
           value={otp}
           onChange={(e) => setOtp(e.target.value)}
         />
        )}

         <Button type="submit" disabled={loading} >
         {loading ? <Hourglass
  visible={loading}
  height="17"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['white', 'white']}
  /> : isOtpSent?'verify Otp': 'Send OTP'}
        </Button>
        
        
        <GoogleLogin  id='googleBtn' width={"100%"} theme='outline' type='standard'
  onSuccess={handleGoogleSuccess}
  onError={() => {
    toast.error('Login failed by google')
    console.log('Login Failed');
  }}
/>

        <h3>already have an account?<Link to='/login'><span className='acc'>login</span></Link></h3>
      </Form>
      
    </Container>

   
   </>
  )
}

export default Signup