import React, {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import JobsFilter from '../JobsFilter'
import JobSearch from '../JobSearch'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobsPage = () => {
  const [search, setSearch] = useState('')
  const [jobsData, setJobsData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [jobType, setJobType] = useState([])
  const [minPackage, setMinPackage] = useState('')
  const [errorShown, setErrorShown] = useState(false)

  const getJobs = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      setApiStatus(apiStatusConstants.failure)
      setErrorShown(true)
      return
    }

    const employmentType = jobType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.jobs.map(item => ({
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          id: item.id,
          jobDescription: item.job_description,
          location: item.location,
          packagePerAnnum: item.package_per_annum,
          rating: item.rating,
          title: item.title,
        }))
        setJobsData(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
        setErrorShown(true)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      setErrorShown(true)
    }
  }, [jobType, minPackage, search])

  const handleSearchJob = useCallback(searchInput => {
    setSearch(searchInput)
  }, [])

  const handleJobTypeChange = useCallback(employmentTypeId => {
    setJobType(prevState =>
      prevState.includes(employmentTypeId)
        ? prevState.filter(id => id !== employmentTypeId)
        : [...prevState, employmentTypeId],
    )
  }, [])

  const handlePackageChange = useCallback(value => {
    setMinPackage(value)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      getJobs()
    }, 500)
    return () => clearTimeout(timer)
  }, [jobType, minPackage, search, getJobs])

  const LoaderComponent = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const ErrorComponent = ({onRetry}) => (
    <div className="error-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        width={300}
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  )

  const renderJobsList = () =>
    jobsData.length > 0 ? (
      <ul className="jobs-list">
        {jobsData.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    ) : (
      <div className="no-job-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          width={300}
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderComponent />
      case apiStatusConstants.failure:
        return <ErrorComponent onRetry={getJobs} />
      case apiStatusConstants.success:
        return renderJobsList()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      <div className="jobs-page">
        <div className="jobs-container">
          <div className="filter-section">
            <JobsFilter
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              handleJobTypeChange={handleJobTypeChange}
              handlePackageChange={handlePackageChange}
            />
          </div>
          <div className="jobs-section">
            {!errorShown && (
              <JobSearch
                handleSearchJob={handleSearchJob}
                errorShown={errorShown}
              />
            )}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsPage
