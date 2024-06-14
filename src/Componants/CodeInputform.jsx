import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';

export const CodeInputform = ({setResult}) => {
     const {user}=useContext(AuthContext)
     const [inputCode,setInputCode]=useState()
     const [type,setType]=useState()
     const [targetLanguage,setTargetLanguage]=useState()
     const [loading,setLoading]=useState(false)
     const navigate=useNavigate()

     const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          setLoading(true)
          if(type==='quality'){
            const res=await axios.post('https://codeconverter1.onrender.com/quality',{inputCode},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
              })
              
              console.log(res)
              setResult(res.data)
          }else if(type==="debug"){
            const res=await axios.post('https://codeconverter1.onrender.com/debug',{inputCode},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
              })
              
              console.log(res)
              setResult(res.data)
          }else if(type==='convert'){
            const res=await axios.post('https://codeconverter1.onrender.com/convert',{targetLanguage,inputCode},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
              })
              
              console.log(res)
              setResult(res.data)
          }
          setLoading(false)
        } catch (error) {
            
        }
     }

     if(!user){
navigate("/login")
     }

      
  return (
  <>
  <form onSubmit={handleSubmit}>
    <TextField
    label='input code'
    multiline
    rows={6}
    variant='outlined'
    value={inputCode}
    onChange={(e)=>setInputCode(e.target.value)}
    fullWidth
    margin='normal'
    />

     <FormControl fullWidth margin='normal'>
       <InputLabel>Type</InputLabel>
       <Select label='type' value={type} onChange={(e)=> setType(e.target.value)} >
       <MenuItem value='convert' >Convert</MenuItem>
       <MenuItem value='quality' >Qaulity Check</MenuItem>
       <MenuItem value='debug' >debug</MenuItem>
       </Select>
     </FormControl>
     {
      type==='convert' && (
         <FormControl fullWidth margin='normal' >
           <InputLabel>Target Language</InputLabel>
           <Select label='Target language' value={targetLanguage} onChange={(e)=>setTargetLanguage(e.target.value)} >
            <MenuItem>C++</MenuItem>
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
           </Select>
         </FormControl>
      )
     }

<LoadingButton loading={loading} variant="contained" color="primary" type="submit">Submit</LoadingButton>
     
  </form>
  </>
  )
}
