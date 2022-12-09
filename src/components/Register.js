import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { color } from "@mui/system";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { useHistory, Link } from "react-router-dom";
import "./Register.css";


const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  // curl -i -X POST -H "Content-Type: application/json" 
  //   -d '{"username": "crio.do", "password": "learnbydoing"}' 
  //   http://65.0.82.15:8082/auth/register
  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [loading, setloading] = useState(false);
  // const [errorMsg, seterrorMsg] = useState('');

  // console.log(typeof(userName));
  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  // console.log(config.endpoint+"/auth/register");
  const URL = config.endpoint+ `/auth/register`;
  // console.log(URL);
  const register = async (formData) => {
    try { 
      const check = validateInput(userName,passWord)
      if(check.isValid){
        setloading(true);
        const res= await axios.post(URL, {username:userName, password:passWord})
        setloading(false);
        if(res.status===201){
        enqueueSnackbar("Registered successfully", {variant: 'success'});
        history.push("/login");
        }
        console.log(res.status);
      }else {
        enqueueSnackbar(check.msg, {variant: check.variant});
    console.log(check.msg);

      }
     
      
    } catch (e) {
      setloading(false);
      if(e.response.status===400){
        enqueueSnackbar(e.response.data.message, {variant: 'error'})
      } else(
        enqueueSnackbar( "Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant: 'error'})
      )
      
      console.log("error", e.response.statusText);
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    const obj ={
      isValid: false,
      msg: "",
      variant: "",
    }
    //username
    if(userName.length===0){
      obj.msg= "Username required";
      obj.variant = "warning";
      return obj;
    }else if (userName.length<6){
      obj.msg= "Username should have atleast 6 characters";
      obj.variant = "warning";
      return obj;
    }else if (passWord.length===0){
      obj.msg= "Password required";
      obj.variant = "warning";
      return obj;
    }else if(passWord.length<6){
      obj.msg= "Password should have atleast 6 characters";
      obj.variant = "warning";
      return obj;
    }else if(passWord.match(" ")){
      obj.msg= "Password cannot contain spaces";
      obj.variant = "warning";
      return obj;
    }else if(confirmPassword.length===0){
      obj.msg= "Please confirm password";
      obj.variant = "warning";
      return obj;
    }else if(passWord!==confirmPassword){
      obj.msg= "Password do not match";
      obj.variant = "warning";
      return obj;
    }else {
      obj.isValid = true;
      return obj;
    }

    
    
    //password
    
  };
  // validateInput()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content" id="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            autoComplete="off"
            onChange={(e) => {setuserName(e.target.value)}}
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            onChange={(e) => {setpassWord(e.target.value)}}
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            onChange={(e) => {setconfirmPassword(e.target.value)}}
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
          {loading ? (<Box sx={{ display: 'flex' }}>
          <CircularProgress />
          </Box>):
           <Button variant="contained" onClick={register}>
            Register Now
           </Button>}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to ="/login" className="link" >
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
