import {BsSearch} from 'react-icons/bs'

// eslint-disable-next-line import/no-unresolved
import './index.css'

const JobsHeader = props => {
  const onChangeSearchInput = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {sortbyOptions, searchInput} = props
  return (
    <div className="job-header">
      <input
        className="search-input"
        type="search"
        onChange={onChangeSearchInput}
        value={searchInput}
      />
      <button type="button">
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default JobsHeader
