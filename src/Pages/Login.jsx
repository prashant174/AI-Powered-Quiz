import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import {useSpring} from '@react-spring/web'
import {Hourglass } from 'react-loader-spinner'
import {Button, Container, Form, Input, InputWrapper, TogglePasswordButton} from '../Styled/styled'
import { GlobalStyles } from '../Componants/GlobalStyles'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ParticleBackground from '../Componants/ParticleBackground'



const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
   
    const {login}=useContext(AuthContext)
    const navigate=useNavigate()
    const formProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });




    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
         
            setLoading(true)
            
            const res= await axios.post('https://codeconverter1.onrender.com/login',{email,password})
            toast(res.data.msg)
          login(res.data)
       
          setLoading(false)
                 navigate("/")
        } catch (error) {
          // toast('invalid credentials from login');
            console.error('Login failed:', error.message);
setLoading(false)
        }
    }

    

  return (
    <>
   <ParticleBackground/>
    <GlobalStyles/>
    
    <Container>
    
    <Form initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} style={formProps} onSubmit={handleSubmit}>
        <h2>Login</h2>
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
         <Button type="submit" disabled={loading} >
          {loading ? <Hourglass
  visible={loading}
  height="17"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['white', 'white']}
  /> : 'Login'}
        </Button>
        
       
        <h3>don't have an account?<Link to="/signup"><span className='acc'>signup</span></Link></h3>
      </Form>
      
    </Container>
    
   
      
    </>
  )
}

export default Login