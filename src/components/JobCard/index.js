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
            alt="company logo"
            width={50}
            height={50}
            loading="lazy"
          />
          <div className="job-card-details">
            <h2 className="job-card-title">{title}</h2>
            <div className="job-card-rating">
              <IoMdStar className="job-card-star-icon" />
              <span className="job-card-rating-text">{rating}</span>
            </div>
          </div>
        </div>
        <div className="job-card-info">
          <div className="job-card-info-section">
            <div className="job-card-location">
              <IoLocationSharp className="job-card-icon" />
              <span className="job-card-location-text">{location}</span>
            </div>
            <div className="job-card-employment-type">
              <MdLocalPostOffice className="job-card-icon" />
              <span className="job-card-employment-text">{employmentType}</span>
            </div>
          </div>
          <span className="job-card-package">{packagePerAnnum}</span>
        </div>
        <hr className="job-card-divider" />
        <h3 className="job-card-description-title">Description</h3>
        <p className="job-card-description-text">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
