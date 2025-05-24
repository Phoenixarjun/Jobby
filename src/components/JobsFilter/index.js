import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const JobsFilter = ({
  employmentTypesList,
  salaryRangesList,
  handleJobTypeChange,
  handlePackageChange,
}) => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      setIsLoading(false)
      return
    }

    try {
      const url = 'https://apis.ccbp.in/profile'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile_details)
      }
    } catch (error) {
      console.error('Error fetching profile details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProfileDetails()
  }, [])

  if (isLoading) {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  if (!profile) {
    return <div>Failed to load profile</div>
  }

  const EmployeeType = ({label, employmentTypeId}) => (
    <div className="checkBox-container">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={() => handleJobTypeChange(employmentTypeId)}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </div>
  )

  const SalaryRange = ({label, salaryRangeId}) => (
    <div className="checkBox-container">
      <input
        type="radio"
        name="salaryRange"
        id={salaryRangeId}
        onChange={() => handlePackageChange(salaryRangeId)}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </div>
  )

  return (
    <div className="jobFilter-container">
      <div className="profile-container">
        <img src={profile.profile_image_url} alt={profile.name} width={60} />
        <h1 className="profile-heading">{profile.name}</h1>
        <p className="profile-description">{profile.short_bio}</p>
      </div>
      <hr />
      <div className="employee-type">
        <h1>Type of Employment</h1>
        <ul className="filter-lists">
          {employmentTypesList.map(type => (
            <li key={type.employmentTypeId}>
              <EmployeeType
                label={type.label}
                employmentTypeId={type.employmentTypeId}
              />
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="salary-range">
        <h1>Salary Range</h1>
        <ul className="filter-lists">
          {salaryRangesList.map(salary => (
            <li key={salary.salaryRangeId}>
              <SalaryRange
                label={salary.label}
                salaryRangeId={salary.salaryRangeId}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobsFilter
