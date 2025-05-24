import React, {useState, useEffect} from 'react'
import './index.css'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocalPostOffice} from 'react-icons/md'
import {IoLocationSharp} from 'react-icons/io5'
import {IoMdStar} from 'react-icons/io'
import {FaExternalLinkAlt} from 'react-icons/fa'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobItemDetails = () => {
  const [jobDetails, setJobDetails] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {id} = useParams()
  const jwtToken = Cookies.get('jwt_token')

  const getJobItemDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const url = `https://apis.ccbp.in/jobs/${id}`
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
        const updatedJobDetails = {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(skill => ({
            name: skill.name,
            imageUrl: skill.image_url,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
        }
        const updatedSimilarJobs = data.similar_jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
          packagePerAnnum: job.package_per_annum,
        }))
        setJobDetails(updatedJobDetails)
        setSimilarJobs(updatedSimilarJobs)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getJobItemDetails()
  }, [id])

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

  const JobDetailsComponent = () => (
    <div className="jobItem-container">
      {jobDetails && (
        <>
          <div className="jobItem-header">
            <img
              className="jobItem-logo"
              src={jobDetails.companyLogoUrl}
              width={50}
              alt="job details company logo"
            />
            <div className="jobItem-details">
              <h1 className="jobItem-title">
                {similarJobs[0].title || 'No title'}
              </h1>
              <div className="jobItem-rating">
                <IoMdStar className="jobItem-star-icon" />
                <p className="jobItem-rating-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="jobItem-info">
            <div className="jobItem-info-section">
              <div className="jobItem-location">
                <IoLocationSharp className="jobItem-location-icon" />
                <p className="jobItem-location-text">{jobDetails.location}</p>
              </div>
              <div className="jobItem-employment-type">
                <MdLocalPostOffice className="jobItem-employment-icon" />
                <p className="jobItem-employment-text">
                  {jobDetails.employmentType}
                </p>
              </div>
            </div>
            <p className="jobItem-package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="jobItem-divider" />
          <div className="jobItem-description-container">
            <h1 className="jobItem-description-title">Description</h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="jobItem-link-container"
            >
              <p>Visit</p>
              <FaExternalLinkAlt className="jobItem-link-icon" />
            </a>
          </div>
          <p className="jobItem-description-text">
            {jobDetails.jobDescription}
          </p>
          <div className="jobItem-skills">
            <h1 className="jobItem-skills-title">Skills</h1>
            <ul className="jobItem-skills-list">
              {jobDetails.skills.map(skill => (
                <li key={skill.name} className="jobItem-skill-item">
                  <img
                    className="jobItem-skill-image"
                    src={skill.imageUrl}
                    alt={skill.name}
                    width={40}
                  />
                  <p className="jobItem-skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobItem-life-at-company">
            <h1 className="jobItem-life-title">Life at Company</h1>
            <div className="jobItem-life-details">
              <p className="jobItem-life-description">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                className="jobItem-life-image"
                src={jobDetails.lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )

  const SimilarJobsComponent = () => (
    <div className="similarJobs-container">
      <h1 className="similarJobs-title">Similar Jobs</h1>
      <ul className="similarJobs-list">
        {similarJobs.map(job => (
          <SimilarJobCard key={job.id} job={job} />
        ))}
      </ul>
    </div>
  )

  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return <LoaderComponent />
    case apiStatusConstants.failure:
      return <ErrorComponent onRetry={getJobItemDetails} />
    case apiStatusConstants.success:
      return (
        <div>
          <Header />
          <div className="jobItem-page">
            <JobDetailsComponent />
            <SimilarJobsComponent />
          </div>
        </div>
      )
    default:
      return null
  }
}

export default JobItemDetails
