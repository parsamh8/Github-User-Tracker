import { type FormEvent, useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface'

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({

    avatar_url: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: '',
  });

  const [searchInput, setSearchInput] = useState<string>('');


  const addToPotentialList = () => {
    let parsedPotentialUser: Candidate[] = [];
    const storedPotentalUser = localStorage.getItem('PotentialCandidate');
    if (typeof storedPotentalUser === 'string') {
      parsedPotentialUser = JSON.parse(storedPotentalUser);
    }
    parsedPotentialUser.push(currentCandidate);
    localStorage.setItem('PotentialCandidate', JSON.stringify(parsedPotentialUser));
  };


  const searchGithubByName = async (event: FormEvent, searchInput: string) => {
    event.preventDefault();
    const data: Candidate = await searchGithub();

    setCurrentCandidate(data);
  };


  return (


    <>
      <section id='searchSection'>
        <form
          onSubmit={(event: FormEvent) =>
            searchGithubByName(event, searchInput)
          }
        >
          <input
            type='text'
            name=''
            id=''
            placeholder='Enter a Name'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type='submit' id='searchBtn'>
            Search
          </button>
        </form>
      </section>
{/* a card required in here */}
    </>

  )
};

export default CandidateSearch;
