import React, {useState, useEffect} from 'react';


const Home = () => {
	const [userName, setUserName] = useState('');
	const [show, setShow] = useState(false);
	//const show = true;
	const userHomePage = async() => {
		try{
			const res = await fetch('/getdata',{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			});
			const data = await res.json();
			
			setUserName(data.name);
			setShow(true);
		}catch(err){
			console.log(err);
		}
		
	}
	useEffect(() => {
		userHomePage();
	}, []);
	return(
	 <>
	 <div class="container">
	 <div className="home-page">
	   <div className="home-div">
	     <p className="pt-5">WELCOME {userName}</p>
		 <h2>{show ? 'welcome this project' : 'welcome this project'}</h2>
	   </div>
	 </div>
	 </div>  
	 </>
	)
}

export default Home