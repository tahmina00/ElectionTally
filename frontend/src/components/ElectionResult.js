import React , { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./electiontally.css";


const ElectionResult = () => {
	
	const { t } = useTranslation();
	const { lng } = useParams();
	const { eid } = useParams();
	const { cid } = useParams();
	const [electionData, setElectionData] = useState([]);
	const [constitutionData, setConstitutionData] = useState([]);
	const [candidateData, setCandidateData] = useState([]);
	
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
	console.log('electiondata')
	console.log(data)
	setElectionData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
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
	console.log('optionsdata')
	console.log(optionsdata)
	setConstitutionData(optionsdata);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(error){
		console.log(error);
		}
	}
	useEffect(()=>{
	   getConstitutionOptionValue();
	},[]);   
    const getCandidateValue = async() => {
	try{
	const res = await fetch('/getcandidatebangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
    setCandidateData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
  	}
	}
	useEffect(()=>{
	   getCandidateValue();
	},[]);

	
	function convertToBengaliDigit(number) {
	  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
	  const numberString = number.toString();
	  let result = '';
	  
	  for (let i = 0; i < numberString.length; i++) {
		const digit = parseInt(numberString[i]);
		result += bengaliDigits[digit];
	  }
	  
	  return result;
	}
	
  const mergedDataCandidates = constitutionData.map((constitutionItem) => {
  const electionItem = electionData.find((item) => item.electionid === constitutionItem.electionid);
  const candidateItems = candidateData.filter((item) => constitutionItem.constitutionid === `${cid}` && item.constitutionid === `${cid}`); // use filter instead of find
  return {
    ...electionItem,
    ...constitutionItem,
    candidates: candidateItems // add the filtered candidate items to the merged object
  };
});
   
	   
    const electionfilteredData = electionData.filter(
	  electionDataItem => electionDataItem.electionid === parseInt(eid)
	);

	const electionnameTitle = electionfilteredData.map(electionDataItem => {
	  return `${lng === 'bng' ? electionDataItem.banglaelectionname : electionDataItem.englishelectionname}`;
	});


	 console.log('electionnameTitle');console.log(electionnameTitle);
	
	console.log('eid')
	console.log(eid)
	
	
	
  return (
    <div className="container-fluid election_box">
	{mergedDataCandidates
				  .filter((mergedDataItem) => mergedDataItem.constitutionid === `${cid}`) // filter the merged data to only include items with constitutionid = 27
				  .map((mergedDataItem, index) => (
				  <>
		  <div className="row header ml-0 mr-0">
			<div className="col-sm-6 col-md-6 title">
			  <a href="https://bangla.bdnews24.com/election/city-corporation-vote">
			  {electionnameTitle}
			  </a>
			</div>
			<div className="col-sm-6 col-md-6 variable">
			{`${lng}` === 'bng' ? (
			  <div>
			  {convertToBengaliDigit(mergedDataItem.totalcenter)} কেন্দ্রের মধ্যে {convertToBengaliDigit(mergedDataItem.obtainedcenter)} কেন্দ্রের ফল
			  </div>
			) : (
			  <div>
				{mergedDataItem.totalcenter} out of {mergedDataItem.obtainedcenter} centres
			  </div>
			)}
			</div>
		  </div>
		   
		  
      <div className="row">
        <div className="col-md-12 candidates_row_outer">
          <div className="row candidates_row   ml-0 mr-0 ">
		   {mergedDataItem.candidates
						.filter((candidate) => candidate.constitutionid === `${cid}`) // filter the candidates to only include items with constitutionid = 27
						.sort((a, b) => b.totalvote - a.totalvote) // sort the candidates array in descending order based on their total votes
						.map((candidate, candidateIndex) => (
		        <>
				<div className="col-sm-12 col-md-4 candidate_box">
				  <div className="logo_box">
					<img id="imagenew" width="100" src={candidate.partysymbol} alt="Candidate Logo" />
				  </div>
				  <div className="seats_box">
					<div className="candidate_title">{`${lng}` == 'bng' ? t(candidate.candidatenamebangla) : candidate.candidatenamebangla}</div>
					<div className="seats">{`${lng}` == 'bng' ? convertToBengaliDigit(candidate.totalvote) : candidate.totalvote}</div>
				  </div>
				</div>
				</>
				
				 ))}
				
          </div>
        </div>
      </div>
	  </>
	 ))}
    </div>
  );
};

export default ElectionResult;
