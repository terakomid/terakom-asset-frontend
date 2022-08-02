import React, { Component } from 'react';

class FilterDashboard extends Component {

    render() {
        return (

            <div className="btn-group dropstart">
                
                <button className="btn dropdown-toggle p-0" type="button" id="filterDashboard" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className='bi bi-list fs-3'></i>
                </button>
                <ul className="dropdown-menu dropstart-custom p-3 w-auto" aria-labelledby="filterDashboard">
                    <li className='w-270px'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="statistic" id="flexRadioDefault1" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Statistics General Asset
                            </label>
                        </div>
                    </li>
                    <li className='w-200px'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="statistic" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Statistics Asset IT
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default FilterDashboard
