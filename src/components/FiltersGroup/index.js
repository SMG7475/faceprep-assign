import './index.css'

const FiltersGroup = props => {
  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {changeSalaryRange, activeSalaryRange} = props
      const onChangeSalaryItem = () => changeSalaryRange(salary.salaryRangeId)

      return (
        <li
          className="rating-item"
          key={salary.salaryRangeId}
          onClick={onChangeSalaryItem}
        >
          <input type="radio" name="salary range" />
          <label className="label">{salary.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilters = () => (
    <div>
      <hr />
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employmentType => {
      const {changeEmploymentType, removeItemEmploymentType} = props
      const onEmploymentType = event => {
        if (event.target.checked) {
          changeEmploymentType(employmentType.employmentTypeId)
        } else {
          removeItemEmploymentType(employmentType.employmentTypeId)
        }
      }

      return (
        <li
          className="category-item"
          key={employmentType.employmentTypeId}
          onClick={onEmploymentType}
        >
          <div>
            <input type="checkbox" onChange={onEmploymentType} />
            <label className="label">{employmentType.label}</label>
          </div>
        </li>
      )
    })
  }

  const renderEmployTypes = () => (
    <>
      <hr />
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderEmploymentList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmployTypes()}
      {renderSalaryRangeFilters()}
    </div>
  )
}

export default FiltersGroup
