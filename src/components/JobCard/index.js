import './index.css'
import {IoMdStar} from 'react-icons/io'
import {MdLocalPostOffice} from 'react-icons/md'
import {IoLocationSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'

const JobCard = ({jobDetails}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <div className="job-card-container">
        <div className="job-card-header">
          <img
            className="job-card-logo"
            src={companyLogoUrl}
            width={50}
            alt="company logo"
          />
          <div className="job-card-details">
            <h1 className="job-card-title">{title}</h1>
            <div className="job-card-rating">
              <IoMdStar className="job-card-star-icon" />
              <p className="job-card-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-info">
          <div className="job-card-info-section">
            <div className="job-card-location">
              <IoLocationSharp className="job-card-star-icon" />
              <p className="job-card-location-text">{location}</p>
            </div>
            <div className="job-card-employment-type">
              <MdLocalPostOffice className="job-card-employment-icon" />
              <p className="job-card-employment-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-card-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-divider" />
        <h1 className="job-card-description-title">Description</h1>
        <p className="job-card-description-text">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
