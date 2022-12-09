import './index.css'

const SimilarJobItems = props => {
  const {details} = props
  const {title, brand, price, imageUrl, rating} = details
  return (
    <li className="list-item">
      <img
        className="similar-products-image"
        src={imageUrl}
        alt="similar product"
      />
      <p>{title}</p>
      <p>By {brand}</p>
      <div className="pricy-container">
        <p>Rs {price}/-</p>
        <div className="ratings">
          <p>{rating}</p>
          <img
            className="star-image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItems
