


import { useState } from "react";

function EditElectionAllData({ electionData }) {
  const [selectedElectionId, setSelectedElectionId] = useState(null);
  const [englishName, setEnglishName] = useState("");
  const [banglaName, setBanglaName] = useState("");
  const [status, setStatus] = useState("");

  const selectedElection = electionData.find(
    (item) => item._id === selectedElectionId
  );

  const handleSave = () => {
    const updatedElectionData = electionData.map((item) =>
      item._id === selectedElectionId
        ? {
            ...item,
            englishelectionname: englishName,
            banglaelectionname: banglaName,
            statusfordisplay: status,
          }
        : item
    );
    // update the election data with the new values
  };

  if (!selectedElection) {
    return null;
  }

  return (
    <div>
      <input
        type="text"
        value={englishName}
        onChange={(e) => setEnglishName(e.target.value)}
      />
      <input
        type="text"
        value={banglaName}
        onChange={(e) => setBanglaName(e.target.value)}
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

function ElectionTable({ electionData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElectionId, setSelectedElectionId] = useState(null);

  const handleEdit = (electionId) => {
    setSelectedElectionId(electionId);
    setIsEditing(true);
  };

  if (isEditing) {
    return <EditElection electionData={electionData} />;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-cell">Election id</div>
        <div className="table-cell">English name</div>
        <div className="table-cell">Bangla name</div>
        <div className="table-cell">status</div>
        <div className="table-cell">EDIT</div>
      </div>
      {electionData.map((item) => (
        <div className="table-row" key={item._id}>
          <div className="table-cell">{item.electionid}</div>
          <div className="table-cell">{item.englishelectionname}</div>
		  <div className="table-cell">{item.banglaelectionname}</div>
		<div className="table-cell">{item.statusfordisplay}</div>
        <div className="table-cell"></div>
		
      </div>
     ))}
    </div>
		</div>
	  
	   </div>
 </div> 

		</>
	)	
}



export default EditElectionAllData
