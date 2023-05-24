
import React , { useState, useEffect  } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./components.css";

const Multidimensionalarray = () => {
   
	const [electionData, setElectionData] = useState([]);

	const [constitutionData, setConstitutionData] = useState([]);

	const [candidateData, setCandidateData] = useState([]);
	
	const [candidateUpdateData, setCandidateUpdateData] = useState([]);
	
	const { electionid } = useParams();
	const history = useHistory();
	
	console.log('electionid');

	console.log(`${electionid}`)
	

  const [selectedElectionId, setSelectedElectionId] = useState('');

  useEffect(() => {
    setSelectedElectionId(electionid);
  }, [electionid]);
	
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
	//console.log(data);
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
	
	
	const getConstitutionOptionValue = async() => {
	try{
	const res = await fetch('/getconstbangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	const optionsdata = await res.json();
	console.log('Constitution data');
	//console.log(optionsdata);
	setConstitutionData(optionsdata);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(error){
	//console.log(error);
	}
	}
	useEffect(()=>{
	   getConstitutionOptionValue();
	},[]); 

	const getCandidateValue = async() => {
	try{
	const res = await fetch(`/dimensional/${electionid}`,{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	console.log('Candidate data');
	//console.log(data);
	setCandidateData(data);
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
	   getCandidateValue();
	},[]);
	
	let name, value;
	
	const handleCandidateChange = (candidateIndex, field, value) => {
  setCandidateData(prevCandidates => {
    const updatedCandidates = [...prevCandidates];
    const candidate = { ...updatedCandidates[candidateIndex] };
    candidate[field] = value;
    updatedCandidates[candidateIndex] = candidate;
    return updatedCandidates;
  });
};

  const handleFormSubmit = async(e) => {
  e.preventDefault();
  const { electionid, constitutionid, candidateid, candidatenamebangla, partysymbol, totalvote, date } = candidateData;
  

 console.log('candidateData front  ' + selectedElectionId+' '  + ' '+ electionid)
  console.log(JSON.stringify(candidateData))
 
  	console.log('=============================================================================')
		
	
		const response = await fetch(`/candidatebangla/${selectedElectionId}`, {
			method:"PUT",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(candidateData)
		});
		
	      console.log('****************************************************************************')
		const data = await response.json();

		if (response.status === 201) {
		  //console.log(data.message); // "value inserted successfully"
		  window.alert("data updated successfully");
		  console.log("data updated successfully");
		  setCandidateData({...candidateData,electionid: "", constitutionid:"", candidateid: "", candidatenamebangla:"", partysymbol: "", totalvote: ""})
		  history.push(`/dimensional/${selectedElectionId}`);
		} else {
		  //console.log("Error:", data.message);
		  window.alert("Invalid data");
		  console.log("Invalid data");
		}	
  	
  };
	
	
	
	return (
	 <div class="container">
  <form onSubmit={handleFormSubmit}>
    {Array.isArray(candidateData) && candidateData.length > 0 && candidateData.map((candidate, candidateIndex) => (
    <div key={candidateIndex}>
      <h3>Candidate {candidateIndex + 1}</h3>
      <label>
        Total Vote:
        <input
          value={candidate.totalvote || ''}
          onChange={(e) => {
            const updatedData = [...candidateData];
            updatedData[candidateIndex].totalvote = e.target.value; // Parse input as an integer
            handleCandidateChange(updatedData);
          }}
          type="number" // Set input type to "number"
        />
      </label>
      <label>
        Candidate Name:
        <input
          value={candidate.candidatenamebangla || ''}
          onChange={e => {
            const updatedData = [...candidateData];
            updatedData[candidateIndex].candidatenamebangla = e.target.value;
            handleCandidateChange(updatedData);
          }}
		  type="text"
        />
      </label>
    </div>
  ))}
  
    <button type="submit">Submit</button>
  </form>
  </div>
);



	
}

export default Multidimensionalarray