import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import mobileicon from "../images/mobileicon.png";
import "./components.css";

const Addelectionname = () => {
		
	const history = useHistory();
	
	const [statusvalue, setStatusvalue] = useState(1);
	
	const [electionNameData, setelectionNameData] = useState({
		banglaelectionname: "", englishelectionname: "", statusfordisplay: ""
	});

	
	// read election value from database
	
	const [electionData, setElectionData] = useState([]);

	let name, value;
	

	
	// we are storing data in states
	
	const handleInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setelectionNameData({...electionNameData, [name]:value});
	}
	
	
	
// send the data to backend
	
	const electionNameForm = async (e) => {
		e.preventDefault();
		
		const {  banglaelectionname, englishelectionname, statusfordisplay } = electionNameData;
		
		console.log('election post data');
		
		
	    
		
		try {
      const response = await fetch('/addelectionname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
				banglaelectionname,
				englishelectionname,
				statusfordisplay: statusvalue
			})
      });
	  
	 console.log('****************************************************************************')
		const data = await response.json();

		if (response.status === 201) {
		  //console.log(data.message); // "value inserted successfully"
		  window.alert("data inserted successfully");
		  console.log("data inserted successfully");
		  setelectionNameData({...electionNameData, banglaelectionname:"", englishelectionname: ""})
		} else {
		  //console.log("Error:", data.message);
		  window.alert("Invalid data");
		  console.log("Invalid data");
		}

   
    } catch (error) {
      console.error(error);
    }
		
  };
	

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
				  <div className="row">
					   <div className="col-lg-10 offset-lg-l">
							   <div className="contact_form_container py-5">
								<div className="contact_form_title">  
                                   <h2>Add Election Name</h2> 
								</div>
								<br/>
												
	<form method="POST" id="contact_form"  onSubmit={electionNameForm}>
	 
	  <>
	  {/* <div className="form_input">
         <label>Election id (serial id)</label>
         <input type="text" onChange={handleInputs} value={electionNameData.electionid} name="electionid" id="electionid" placeholder="Enter your Electionid ( serial id)" />
	  </div>*/}
	   <div className="form_input">
         <label>Election name in Bangla</label>
         <input type="text" onChange={handleInputs} value={electionNameData.banglaelectionname} name="banglaelectionname" id="banglaelectionname" placeholder="Enter your banglaelectionname" />
       </div>
	   <div className="form_input">
        <label>Election name in English</label>
        <input type="text" onChange={handleInputs} value={electionNameData.englishelectionname} name="englishelectionname" id="englishelectionname" placeholder="Enter your englishelectionname" />
       </div>
	   <input type="hidden" name="statusfordisplay" defaultValue={statusvalue} />
	
	
	  <br/>
	  {/*<div className="contact_form_button">
		 <input type="submit" name="electionnamesubmit" id="electionnamesubmit" className="form-submit" value="submit" onClick={electionNameForm} />
	  </div>*/}
	  <button type="submit">Submit</button>

      
	 </>
		
	</form>
							  </div>
					  </div>
				  </div>
			  </div>
		</div> 
		
		 <div className="start_form">
			  <div className="container">
				  <div className="row">
					<div class="result">
						<h2>Result</h2>
					
					
				<div>
					{electionData.map((item) => (
						<div key={item._id}>
							<p>Name: {item.banglaelectionname}</p>
							<p>English name : {item.englishelectionname}</p>
						</div>
					))}
				</div>
					</div>
		          </div>
			  </div>
		 </div> 
		
		</>
)
}

export default Addelectionname
	