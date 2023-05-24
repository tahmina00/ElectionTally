
import React , { useState, useEffect  } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./components.css";

const Dimensional2api = () => {
   
	const [candidateindividualData, setCandidateindividualData] = useState({});
    const [constitutionsData, setConstitutionsData] = useState({});
	
	const [candidateData, setCandidateData] = useState([]);
	
	const [responseData, setResponseData] = useState(null);
	
	const { electionid } = useParams();
	const history = useHistory();
	
	console.log('electionid');

	console.log(`${electionid}`)
	

  const [selectedElectionId, setSelectedElectionId] = useState('');

  useEffect(() => {
    setSelectedElectionId(electionid);
  }, [electionid]);
	
	
	const getCandidateValue = async() => {
	try{
	const res = await fetch(`/dimensional2api/${electionid}`,{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const responseData = await res.json();
	console.log('Candidate data');
	console.log(responseData);
	setResponseData(responseData);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	
	// Update the state variables
    setCandidateData(responseData.candidateindividualdata);
    setConstitutionsData(responseData.constitutions);
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
  // Destructure constitutionsData
  const { electionid: constitutionElectionId, constitutionid: constitutionConsId, banglaconstitutionname, totalcenter, obtainedcenter, sortingorder, date: constitutionDate } = constitutionsData;

  console.log('candidateData front  ' + selectedElectionId+' '  + ' '+ electionid)
  console.log(JSON.stringify(candidateData))
  console.log(JSON.stringify(constitutionsData))
  
  const mergedData = {
  candidateData: candidateData,
  constitutionsData: constitutionsData
};
  
  const mergeData2 = {
	  electionid, 
	  constitutionid, 
	  candidateid, 
	  candidatenamebangla,
	  partysymbol, 
	  totalvote, 
	  date,
	  electionid: constitutionElectionId,
	  constitutionid: constitutionConsId,
	  banglaconstitutionname,
	  totalcenter, 
	  obtainedcenter	  
  }
 
  	console.log('=============================================================================')
		
	
		const candidateResponse = await fetch(`/candidatebangla2api/${selectedElectionId}`, {
			method:"PUT",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(mergedData)
		});
		
		 if (!candidateResponse.ok) {
		  throw new Error("Failed to submit candidate data");
		}
		
		 console.log(candidateResponse)
		
	      console.log('****************************************************************************')
		const data = await candidateResponse.json();
		
		if (candidateResponse.status === 201) {
		  //console.log(data.message); // "value inserted successfully"
		  window.alert("data updated successfully");
		  console.log("data updated successfully");
		  setCandidateData({...candidateData,electionid: "", constitutionid:"", candidateid: "", candidatenamebangla:"", partysymbol: "", totalvote: ""})
		  //setConstitutionsData({...constitutionsData, electionid: "", constitutionid:"", banglaconstitutionname:"", totalcenter: "", obtainedcenter: ""}})
		  history.push(`/dimensional2api/${selectedElectionId}`);
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
   {Array.isArray(constitutionsData) && constitutionsData.length > 0 && constitutionsData.map((constitutions, constitutionsIndex) => (
    <div key={constitutionsIndex}>
      <h3>constitutions {constitutionsIndex + 1}</h3>
      <label>
        Total center:
        <input
          value={constitutions.totalcenter || ''}
          onChange={(e) => {
            const updatedData = [...constitutionsData];
            updatedData[constitutionsIndex].totalcenter = e.target.value; // Parse input as an integer
            handleCandidateChange(updatedData);
          }}
          type="number" // Set input type to "number"
        />
      </label>
	  <label>
        Obtained center:
        <input
          value={constitutions.obtainedcenter || ''}
          onChange={(e) => {
            const updatedData = [...constitutionsData];
            updatedData[constitutionsIndex].obtainedcenter = e.target.value; // Parse input as an integer
            handleCandidateChange(updatedData);
          }}
          type="number" // Set input type to "number"
        />
      </label>
      <label>
        constitutions Name:
        <input
          value={constitutions.banglaconstitutionname || ''}
          onChange={e => {
            const updatedData = [...constitutionsData];
            updatedData[constitutionsIndex].banglaconstitutionname = e.target.value;
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

export default Dimensional2api