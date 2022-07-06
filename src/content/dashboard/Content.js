// Content.js

// Component
import React, { Component } from 'react';

// Filter Dashboard
import FilterDashboard from './FilterDashboard';
// Select Location
import SelectLocation from './SelectLocation';
// Select Category
import SelectCategory from './SelectCategory';
// Button Apply
import ButtonApply from './ButtonApply';
// Chart total asset by category
import ChartTotalAssetByCategory from './ChartTotalAssetByCategory';
// Chart total asset by condition
import ChartTotalAssetByCondition from './ChartTotalAssetByCondition';
// Total Asset IT
import TotalAssetIT from './TotalAssetIT';
// Total Asset Non IT
import TotalAssetNonIT from './TotalAssetNonIT';

class Content extends Component {

    render() {
        return (

            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">


                        <div className='card shadow-sm'>

                            <div className='card-body'>

                                <div className='mb-5 pb-4'>
                                    <div className='float-end'>
                                        {/* FIlter Dashboard */}
                                        <FilterDashboard />
                                    </div>
                                </div>

                                <div className='row'>

                                    {/* Title */}
                                    <h4 className="card-title fs-4 fw-bold">Filter</h4>

                                    {/* Filter By Location */}
                                    <div className="col-xl-5 col-sm-6 py-3">
                                        <SelectLocation />
                                    </div>

                                    {/* Filter By Category */}
                                    <div className="col-xl-5 col-sm-6 py-3">
                                        <SelectCategory />
                                    </div>

                                    {/* Btn Apply */}
                                    <div className="col-xl-2 col-sm-12 m-auto py-3">
                                        <ButtonApply />
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Total Assets By Category */}
                        <div className='row mb-3'>
                            <div className="col-xl-12 col-sm-12">
                                <ChartTotalAssetByCategory />
                            </div>
                        </div>

                        <div className="row mb-3">

                            {/* Total Assets By Condition */}
                            <div className="col-xl-4 col-sm-6">
                                <ChartTotalAssetByCondition />
                            </div>

                            {/* Total Assets IT */}
                            <div className="col-xl-4 col-sm-6">
                                <TotalAssetIT />
                            </div>

                            {/* Total Assets Non IT */}
                            <div className="col-xl-4 col-sm-6">
                                <TotalAssetNonIT />
                            </div>
                        </div>
                        {/* end row */}

                    </div>
                    {/* container-fluid  */}
                </div>
            </div>
        )
    }

}

export default Content