import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentType: [],
    searchInput: '',
    activeSalaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentType, searchInput, activeSalaryRange} = this.state
    const joinedEmpolymentType = activeEmploymentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedEmpolymentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeEmploymentType: '',
        activeSalaryRange: '',
      },
      this.getJobs,
    )
  }

  changeEmploymentType = receivedActiveEmploymentType => {
    const {activeEmploymentType} = this.state
    const updatedList = [...activeEmploymentType, receivedActiveEmploymentType]
    this.setState(
      {
        activeEmploymentType: updatedList,
      },
      this.getJobs,
    )
  }

  removeItemEmploymentType = Item => {
    const {activeEmploymentType} = this.state
    if (activeEmploymentType.includes(Item)) {
      const removedList = activeEmploymentType.filter(
        employmentType => employmentType !== Item,
      )
      console.log(activeEmploymentType)
      const updatedEmploymentTypeList = [...removedList]
      this.setState(
        {
          activeEmploymentType: updatedEmploymentTypeList,
        },
        this.getJobs,
      )
    }
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  filteredList = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
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

  renderProductsListView = () => {
    const {jobsList, searchInput} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-jobs-container">
        <div className="job-header">
          <input
            className="search-input"
            type="search"
            onChange={this.changeSearchInput}
            value={searchInput}
          />
          <button
            type="button"
            className="search-button"
            onClick={this.filteredList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard JobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <div className="job-header">
          <input
            className="search-input"
            type="search"
            onChange={this.changeSearchInput}
            value={searchInput}
          />
          <button
            type="button"
            className="search-button"
            onClick={this.filteredList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
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
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentType, activeSalaryRange} = this.state

    return (
      <div className="all-products-section">
        <div>
          <Profile />
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            activeEmploymentType={activeEmploymentType}
            activeSalaryRange={activeSalaryRange}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            removeItemEmploymentType={this.removeItemEmploymentType}
          />
        </div>
        <div>{this.renderAllProducts()}</div>
      </div>
    )
  }
}

export default AllJobsSection
