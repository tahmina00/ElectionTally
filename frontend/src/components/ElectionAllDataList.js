import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";
import ChildComponent from './EditElectionData';

const ElectionAllDataList = () => {
	
	const history = useHistory();
	
	// read election value from database
	
	const [electionData, setElectionData] = useState([]);
	
	// we are retrive data from db

	const getElectionValue = async() => {
	try{
	const res = await fetch('/getelectiondata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	console.log('Election data');
	console.log(data);
	setElectionData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
	//history.push('./login');
	}
	}
	useEffect(()=>{
	   getElectionValue();
	},[]);
	
	

	return(
        <>
		  <div className="start_form">
			  <div className="container">
			    	<div>
					 <div className="table-container" >
					 <div className="table-header">
						<div className="table-cell">Election id</div>
						<div className="table-cell">English name</div>
						<div className="table-cell">Bangla name</div>
						<div className="table-cell">status</div>
						<div className="table-cell">EDIT</div>
					  </div>
					{electionData.map((item) => (
      <div className="table-row" key={item._id}>
        <div className="table-cell" key={item._id}>{item.electionid}</div>
        <div className="table-cell">{item.englishelectionname}</div>
        <div className="table-cell">{item.banglaelectionname}</div>
		<div className="table-cell">{item.statusfordisplay}</div>
		<div className="table-cell"><NavLink to={`/dimensional/${item.electionid}`}>Edit</NavLink></div>
		<div className="table-cell"><NavLink to={`/dimensional2api/${item.electionid}`}>TotalCenterEdit</NavLink></div>
      </div>
     ))}
    </div>
		</div>
	  
	   </div>
 </div> 

		</>
	)	
}


export default ElectionAllDataList