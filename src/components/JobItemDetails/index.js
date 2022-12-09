import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobItems from '../SimilarJobItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        title: fetchedData.title,
        brand: fetchedData.brand,
        price: fetchedData.price,
        description: fetchedData.description,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        rating: fetchedData.rating,
        availability: fetchedData.availability,
        totalReviews: fetchedData.total_reviews,
        similarProducts: fetchedData.similar_products,
      }
      this.setState({
        productDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateSimilarProducts = () => {
    const {productDetails} = this.state
    const {similarProducts} = productDetails
    const updatedSimilarProducts = similarProducts.map(product => ({
      title: product.title,
      brand: product.brand,
      price: product.price,
      description: product.description,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
      availability: product.availability,
      totalReviews: product.total_reviews,
    }))
    console.log(updatedSimilarProducts)
    return updatedSimilarProducts
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  increaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decreaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsDetaisView = () => {
    const {productDetails, quantity} = this.state
    const similarProductsList = this.updateSimilarProducts()
    const {
      title,
      brand,
      price,
      description,
      imageUrl,
      rating,
      availability,
      totalReviews,
    } = productDetails

    return (
      <div className="all-products-container">
        <div className="top-container">
          <img className="product-detail" src={imageUrl} alt="product" />
          <div className="details-container">
            <h1>{title}</h1>
            <p>Rs {price}/-</p>
            <div className="ratings-container">
              <div className="rating">
                <p>{rating}</p>
                <img
                  className="star-image"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>Available: {availability}</p>
            <p>Brand: {brand}</p>
            <hr />
            <div className="quantity-container">
              <BsDashSquare testid="minus" onClick={this.decreaseQuantity} />
              <p>{quantity}</p>
              <BsPlusSquare testid="plus" onClick={this.increaseQuantity} />
            </div>
            <button type="button" className="add-to-cart-button">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1>Similar Products</h1>
        <ul className="list-container">
          {similarProductsList.map(eachProduct => (
            <SimilarJobItems key={eachProduct.id} details={eachProduct} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsDetaisView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-products-section">
        <Header />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default ProductItemDetails
