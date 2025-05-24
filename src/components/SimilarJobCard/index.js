import React from 'react'
import {IoMdStar} from 'react-icons/io'
import {MdLocalPostOffice} from 'react-icons/md'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobCard = ({job}) => {
  const {
    companyLogoUrl,
    title,
    location,
    packagePerAnnum,
    rating,
    jobDescription,
    employmentType,
  } = job

  return (
    <li className="similarJobCard">
      <div className="similarJobCard-header">
        <img
          className="similarJobCard-logo"
          src={companyLogoUrl}
          alt="company logo"
          width={50}
        />
        <div className="similarJobCard-details">
          <h1 className="similarJobCard-title">{title}</h1>
          <div className="similarJobCard-rating">
            <IoMdStar className="similarJobCard-star-icon" />
            <p className="similarJobCard-rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similarJobCard-description-container">
        <h1 className="similarJobCard-description-title">Description</h1>
        <p className="similarJobCard-description">{jobDescription}</p>
      </div>
      <div className="similarJobCard-info">
        <div className="similarJobCard-info-section">
          <div className="similarJobCard-location">
            <IoLocationSharp className="similarJobCard-location-icon" />
            <p className="similarJobCard-location-text">{location}</p>
          </div>
          <div className="similarJobCard-employment-type">
            <MdLocalPostOffice className="similarJobCard-employment-icon" />
            <p className="similarJobCard-employment-text">{employmentType}</p>
          </div>
        </div>
        <p className="similarJobCard-package">{packagePerAnnum}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
