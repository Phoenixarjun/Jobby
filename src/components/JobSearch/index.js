import {useState} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'

const JobSearch = ({handleSearchJob, errorShown}) => {
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearchButton = () => {
    handleSearchJob(searchInput)
  }

  return (
    <div className="jobSearch-container">
      <input
        type="search"
        placeholder="Search"
        onChange={onChangeSearchInput}
        value={searchInput}
        className="searchBox"
      />
      <button
        className="searchBtn"
        type="button"
        data-testid="searchButton"
        onClick={onClickSearchButton}
      >
        <BsSearch className="search-icon" />
      </button>
      {errorShown && (
        <p className="error-message">Error fetching jobs. Please try again.</p>
      )}
    </div>
  )
}

export default JobSearch
