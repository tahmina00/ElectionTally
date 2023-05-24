import React, { useEffect,useContext,useState } from 'react';
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";


const Logout = () => {
	
	// promises
	const {state, dispatch} = useContext(UserContext);
	const history = useHistory();
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const clearCredentials = () => {
    setEmail('');
    setPassword('');
  };
	
	useEffect(() => {
		fetch('/logout', {
			method:"GET",
			headers:{
				Accept: "application/json",
				"Content-Type" : "application/json"
			},
			credentials: "include"
		}).then((res) => {
			dispatch({type:"USER", payload:false})
			history.push('/login', { replace: true })
			localStorage.removeItem('authenticated');
			localStorage.removeItem('candidateValues');
	        clearCredentials();
			if(res.status !== 200){
				const error = new Error(res.error);
				throw error;
			}
		}).catch((err) => {
			console.log(err)
		})
	});
	return(
	    <>
	      <h2>Logout page</h2>
	
	    </>
	)
}

export default Logout