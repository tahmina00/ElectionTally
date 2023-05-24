import React, { createContext, useReducer, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/NavbarNew";
import Home from "./components/Home";


import Login from "./components/Login";
import Signup from "./components/Signup";   
import Addelectionname from "./components/Addelectionname"; 

import Addconstitutionname from "./components/Addconstitutionname";
import ElectionAllDataList from "./components/ElectionAllDataList";    


import CandidateAllDataList from "./components/CandidateAllDataList";
import Candidatedataedit from "./components/Candidatedataedit";


import ConstitutionAllData from "./components/ConstitutionAllData";
import Dimensional2api from "./components/Dimensional2api";



import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";

import Constitutionbangla from "./components/Constitutionbangla";
import Constitutionenglish from "./components/Constitutionenglish";

import Candidateforbangla from "./components/Candidateforbangla";
import Candidateenglish from "./components/Candidateenglish";


import ElectionResult from './components/ElectionResult';

import { initialState, reducer } from "../src/reducer/UseReducer";

import { I18nextProvider } from 'react-i18next';
// import i18n (needs to be bundled ;)) 
import i18n from './i18n';

// contextAPI
export const UserContext = createContext(null);
	
	const Routing =() => {
		return (
	<Switch>
	   <Route exact path="/">
	    <Home/>
	  </Route>
	 
	  <Route path="/constitution/:electionid">
          <Constitution />
        </Route>
	   
	   <Route path="/login">
	    <Login/>
	  </Route>
	   <Route path="/signup">
	    <Signup/>
	  </Route>
	  
	   <Route path="/electionalldatalist">
	    <ElectionAllDataList/>
	  </Route> 
	  <Route path="/constitutionalldata">
	    <ConstitutionAllData/>
	  </Route> 
	  <Route path='/posts/edit/:id'>
	    <EditElectionData/>
	  </Route> 
	
	   <Route path="/candidatealldatalist">
	    <CandidateAllDataList/>
	  </Route> 
	   <Route path="/candidatedataedit/:candidateid">
          <Candidatedataedit />
       </Route>  
	   <Route path="/candidateedit/:electionid">
          <Candidateedit />
       </Route>     
	   
	 
	   
	    <Route path="/dimensional2api/:electionid">
          <Dimensional2api />
       </Route> 
	  
	  
	   <Route path="/addelectionname">
	    <Addelectionname/>
	  </Route>
	  <Route path="/addconstitutionname">
	    <Addconstitutionname/>
	  </Route>
	  <Route path="/constitutionbangla">
	    <Constitutionbangla/>
	  </Route>
	  <Route path="/constitutionenglish">
	    <Constitutionenglish/>
	  </Route>
	   <Route path="/candidatebangla">
	    <Candidatebangla/>
	  </Route>  
	   <Route path="/candidateforbangla">
	    <Candidateforbangla/>
	  </Route>
	  <Route path="/candidateenglish">
	    <Candidateenglish/>
	  </Route>
	  
	  <Route path="/election">
	    <ElectionList/>
	  </Route> 
	  
      <Route path="/electionresult/:lng/:eid/:cid">
	    <ElectionResult/>
	  </Route>  		  
     
	  <Route path="/logout">
	    <Logout/>
	  </Route>
	  <Route>
	    <ErrorPage/>
	  </Route>
	   </Switch>
	   )
	}
	
const App = () => {

const showNavbarElection = !window.location.pathname.includes('/electionresult');

const [state, dispatch] = useReducer(reducer, initialState);

const accessToken = localStorage.getItem('isLoggedin');

	
  return (
    <>
	<I18nextProvider i18n={i18n}>
	<UserContext.Provider value={{state, dispatch}}>
	  {showNavbarElection ? <Navbar/> : null}
	  <Routing/>
	</UserContext.Provider>
	</I18nextProvider>
	</>
  )
}



export default App;
