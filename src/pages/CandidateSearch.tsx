import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface'

const CandidateSearch = () => {

  // the initial value of candidate data when the page load
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar: '',
    name: '',
    username: '',
    location: '',
    email: '',
    company: '',
    bio: '',
  });

  const [candidates, setCandidates] = useState<Candidate[]>([])

  const [currentIndex, setCurrentIndex] = useState<number>(0);



  useEffect(() => {

    async function getData() {

      // await to get the data back from searchGithub function. assign to data
      const data = await searchGithub();
      setCandidates(data);

      const firstCandidateData = await searchGithubUser(data[currentIndex].login);

      console.log(firstCandidateData)

      setCurrentCandidate({
        avatar: firstCandidateData.avatar_url,
        name: firstCandidateData.name,
        username: firstCandidateData.login,
        location: firstCandidateData.location,
        email: firstCandidateData.email,
        company: firstCandidateData.company,
        bio: firstCandidateData.bio,
      })
    }


    getData();

  }, [])


// another useEffect for switching to new user; receiving new data with increament the index
  useEffect(() => {
    async function getUserData() {
      const candidateData = await searchGithubUser(candidates[currentIndex].login)
// set candidate with new data
      setCurrentCandidate({
        avatar: candidateData.avatar_url,
        name: candidateData.name,
        username: candidateData.login,
        location: candidateData.location,
        email: candidateData.email,
        company: candidateData.company,
        bio: candidateData.bio,

      })
    }

    getUserData()

  }, [currentIndex])



  

  function saveCandidate() {
    // load current saved array from localstorage
    const chosenCandidates = JSON.parse(localStorage.getItem("chosenCandidates")) || [];

    // push currentCandidate to the saved array
    chosenCandidates.push(currentCandidate)

    // update localstorage with the new saved array
    localStorage.setItem("chosenCandidates", JSON.stringify(chosenCandidates))


    // go to next candidate
    nextCandidate();

  }

  function nextCandidate() {
    // take note that candidates array only has a length of 30
    // if you go beyond 30, theres no more candidates
    setCurrentIndex(currentIndex + 1)
  }


  return (


    <>

      <div className="card">
        <div className="card-img"
          style={{
            backgroundImage: `url(${currentCandidate.avatar})`
          }}

        ></div>

        <h4>{currentCandidate.username}</h4>
        <p>Location: {currentCandidate.location || "No location provided"}</p>
        <p>Email: {currentCandidate.email || "No email provided"}</p>
        <p>Company: {currentCandidate.company || "No company provided"}</p>
        <p>Bio: {currentCandidate.bio || "No bio provided"}</p>


      </div>

      <div className="button-container">
        <button onClick={nextCandidate}>Next</button>
        <button onClick={saveCandidate}>Save</button>
      </div>



    </>

  )
};

export default CandidateSearch;
