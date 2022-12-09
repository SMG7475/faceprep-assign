import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {GiSuitcase} from 'react-icons/gi'
import './index.css'

const ProductCard = props => {
  const {JobData} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = JobData

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item">
        <div className="logo-container">
          <img className="company-logo" src={companyLogoUrl} alt={title} />
          <div className="name-rating-container">
            <p className="title">{title}</p>
            <div className="star-rating-container">
              <AiFillStar className="star" />
              <p className="para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-salary-container">
          <div className="location-type-container">
            <div className="location-container">
              <GoLocation />
              <p className="para">{location}</p>
            </div>
            <div className="type-container">
              <GiSuitcase />
              <p className="para">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>

        <hr />
        <p>Description</p>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default ProductCard
