// Content.js

import React, { Component } from 'react';

class Content extends Component {

    render() {
        return (
            <div className="page-content">
                <div className="container-fluid">

                    {/* start page title */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="page-title-box">
                                <h4>Dashboard</h4>
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="#link">Lexa</a></li>
                                    <li className="breadcrumb-item"><a href="#link">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="state-information d-none d-sm-block">
                                <div className="state-graph">
                                    <div id="header-chart-1"></div>
                                    <div className="info">Balance $ 2,317</div>
                                </div>
                                <div className="state-graph">
                                    <div id="header-chart-2"></div>
                                    <div className="info">Item Sold 1230</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row">
                        <div className="col-xl-3 col-sm-6">
                            <div className="card mini-stat bg-primary">
                                <div className="card-body mini-stat-img">
                                    <div className="mini-stat-icon">
                                        <i className="mdi mdi-cube-outline float-end"></i>
                                    </div>
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Orders</h6>
                                        <h2 className="mb-4 text-white">1,587</h2>
                                        <span className="badge bg-info"> +11% </span> <span className="ms-2">From previous
                                            period</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card mini-stat bg-primary">
                                <div className="card-body mini-stat-img">
                                    <div className="mini-stat-icon">
                                        <i className="mdi mdi-buffer float-end"></i>
                                    </div>
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Revenue</h6>
                                        <h2 className="mb-4 text-white">$46,782</h2>
                                        <span className="badge bg-danger"> -29% </span> <span className="ms-2">From previous
                                            period</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card mini-stat bg-primary">
                                <div className="card-body mini-stat-img">
                                    <div className="mini-stat-icon">
                                        <i className="mdi mdi-tag-text-outline float-end"></i>
                                    </div>
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Average Price</h6>
                                        <h2 className="mb-4 text-white">$15.9</h2>
                                        <span className="badge bg-warning"> 0% </span> <span className="ms-2">From previous
                                            period</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card mini-stat bg-primary">
                                <div className="card-body mini-stat-img">
                                    <div className="mini-stat-icon">
                                        <i className="mdi mdi-briefcase-check float-end"></i>
                                    </div>
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Product Sold</h6>
                                        <h2 className="mb-4 text-white">1890</h2>
                                        <span className="badge bg-info"> +89% </span> <span className="ms-2">From previous
                                            period</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end row */}

                    <div className="row">

                        <div className="col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Monthly Earnings</h4>

                                    <div className="row text-center mt-4">
                                        <div className="col-6">
                                            <h5 className="font-size-20">$56241</h5>
                                            <p className="text-muted">Marketplace</p>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="font-size-20">$23651</h5>
                                            <p className="text-muted">Total Income</p>
                                        </div>
                                    </div>

                                    <div id="morris-donut-example" className="morris-charts morris-charts-height" dir="ltr">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Email Sent</h4>

                                    <div className="row text-center mt-4">
                                        <div className="col-4">
                                            <h5 className="font-size-20">$ 89425</h5>
                                            <p className="text-muted">Marketplace</p>
                                        </div>
                                        <div className="col-4">
                                            <h5 className="font-size-20">$ 56210</h5>
                                            <p className="text-muted">Total Income</p>
                                        </div>
                                        <div className="col-4">
                                            <h5 className="font-size-20">$ 8974</h5>
                                            <p className="text-muted">Last Month</p>
                                        </div>
                                    </div>

                                    <div id="morris-area-example" className="morris-charts morris-charts-height" dir="ltr">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Monthly Earnings</h4>

                                    <div className="row text-center mt-4">
                                        <div className="col-6">
                                            <h5 className="font-size-20">$ 2548</h5>
                                            <p className="text-muted">Marketplace</p>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="font-size-20">$ 6985</h5>
                                            <p className="text-muted">Total Income</p>
                                        </div>
                                    </div>

                                    <div id="morris-bar-stacked" className="morris-charts morris-charts-height" dir="ltr">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* end row */}

                    <div className="row">

                        <div className="col-xl-4 col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">Inbox</h4>
                                    <div className="inbox-wid">
                                        <a href="#link" className="text-dark">
                                            <div className="inbox-item">
                                                <div className="inbox-item-img float-start me-3">
                                                    <img src="assets/images/users/user-1.jpg" className="avatar-sm rounded-circle" alt="user" />
                                                </div>
                                                <h6 className="inbox-item-author mb-1 font-size-16">Misty</h6>
                                                <p className="inbox-item-text text-muted mb-0">Hey! there I'm available...
                                                </p>
                                                <p className="inbox-item-date text-muted">13:40 PM</p>
                                            </div>
                                        </a>
                                        <a href="#link" className="text-dark">
                                            <div className="inbox-item">
                                                <div className="inbox-item-img float-start me-3">
                                                    <img src="assets/images/users/user-2.jpg" className="avatar-sm rounded-circle" alt="user" />
                                                </div>
                                                <h6 className="inbox-item-author mb-1 font-size-16">Melissa</h6>
                                                <p className="inbox-item-text text-muted mb-0">I've finished it! See you
                                                    so...</p>
                                                <p className="inbox-item-date text-muted">13:34 PM</p>
                                            </div>
                                        </a>
                                        <a href="#link" className="text-dark">
                                            <div className="inbox-item">
                                                <div className="inbox-item-img float-start me-3">
                                                    <img src="assets/images/users/user-3.jpg" className="avatar-sm rounded-circle" alt="user" /></div>
                                                <h6 className="inbox-item-author mb-1 font-size-16">Dwayne</h6>
                                                <p className="inbox-item-text text-muted mb-0">This theme is awesome!</p>
                                                <p className="inbox-item-date text-muted">13:17 PM</p>
                                            </div>
                                        </a>
                                        <a href="#link" className="text-dark">
                                            <div className="inbox-item">
                                                <div className="inbox-item-img float-start me-3">
                                                    <img src="assets/images/users/user-4.jpg" className="avatar-sm rounded-circle" alt="user" /></div>
                                                <h6 className="inbox-item-author mb-1 font-size-16">Martin</h6>
                                                <p className="inbox-item-text text-muted mb-0">Nice to meet you</p>
                                                <p className="inbox-item-date text-muted">12:20 PM</p>
                                            </div>
                                        </a>
                                        <a href="#link" className="text-dark">
                                            <div className="inbox-item">
                                                <div className="inbox-item-img float-start me-3">
                                                    <img src="assets/images/users/user-5.jpg" className="avatar-sm rounded-circle" alt="user" /></div>
                                                <h6 className="inbox-item-author mb-1 font-size-16">Vincent</h6>
                                                <p className="inbox-item-text text-muted mb-0">Hey! there I'm available...
                                                </p>
                                                <p className="inbox-item-date text-muted">11:47 AM</p>
                                            </div>
                                        </a>

                                        <a href="#link" className="text-dark">
                                            <div className="inbox-item">
                                                <div className="inbox-item-img float-start me-3">
                                                    <img src="assets/images/users/user-6.jpg" className="avatar-sm rounded-circle" alt="user" /></div>
                                                <h6 className="inbox-item-author mb-1 font-size-16">Robert Chappa</h6>
                                                <p className="inbox-item-text text-muted mb-0">Hey! there I'm available...
                                                </p>
                                                <p className="inbox-item-date text-muted">10:12 AM</p>
                                            </div>
                                        </a>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-xl-4 col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Recent Activity Feed</h4>

                                    <ol className="activity-feed mb-0">
                                        <li className="feed-item">
                                            <div className="feed-item-list">
                                                <span className="date">Jun 25</span>
                                                <span className="activity-text">Responded to need “Volunteer
                                                    Activities”</span>
                                            </div>
                                        </li>
                                        <li className="feed-item">
                                            <div className="feed-item-list">
                                                <span className="date">Jun 24</span>
                                                <span className="activity-text">Added an interest “Volunteer
                                                    Activities”</span>
                                            </div>
                                        </li>
                                        <li className="feed-item">
                                            <div className="feed-item-list">
                                                <span className="date">Jun 23</span>
                                                <span className="activity-text">Joined the group “Boardsmanship
                                                    Forum”</span>
                                            </div>
                                        </li>
                                        <li className="feed-item">
                                            <div className="feed-item-list">
                                                <span className="date">Jun 21</span>
                                                <span className="activity-text">Responded to need “In-Kind
                                                    Opportunity”</span>
                                            </div>
                                        </li>
                                    </ol>

                                    <div className="text-center">
                                        <a href="#link" className="btn btn-sm btn-primary">Load More</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-xl-4">
                            <div className="card widget-user">
                                <div className="widget-user-desc p-4 text-center bg-primary position-relative">
                                    <i className="fas fa-quote-left h2 text-white-50"></i>
                                    <p className="text-white mb-0">The European languages are members of the same family.
                                        Their separate existence is a myth. For science, music, sport, etc, Europe the
                                        same vocabulary. The languages only in their grammar.</p>
                                </div>
                                <div className="p-4">
                                    <div className="float-start mt-2 me-3">
                                        <img src="assets/images/users/user-2.jpg" alt="user" className="rounded-circle avatar-sm" />
                                    </div>
                                    <h6 className="mb-1 font-size-16 mt-2">Marie Minnick</h6>
                                    <p className="text-muted mb-0">Marketing Manager</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Yearly Sales</h4>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div>
                                                <h3>52,345</h3>
                                                <p className="text-muted">The languages only differ grammar</p>
                                                <a href="#link" className="text-primary">Learn more <i
                                                    className="mdi mdi-chevron-double-right"></i></a>
                                            </div>
                                        </div>
                                        <div className="col-md-8 text-end">
                                            <div id="sparkline"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* end row */}

                    <div className="row">
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Latest Transactions</h4>

                                    <div className="table-responsive">
                                        <table className="table align-middle table-centered table-vertical table-nowrap">

                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="assets/images/users/user-2.jpg" alt="user" className="avatar-xs rounded-circle me-2" /> Herbert C. Patton
                                                    </td>
                                                    <td><i className="mdi mdi-checkbox-blank-circle text-success"></i>
                                                        Confirm</td>
                                                    <td>
                                                        $14,584
                                                        <p className="m-0 text-muted font-size-14">Amount</p>
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                        <p className="m-0 text-muted font-size-14">Date</p>
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <img src="assets/images/users/user-3.jpg" alt="user"
                                                            className="avatar-xs rounded-circle me-2" /> Mathias N. Klausen
                                                    </td>
                                                    <td><i className="mdi mdi-checkbox-blank-circle text-warning"></i>
                                                        Waiting payment</td>
                                                    <td>
                                                        $8,541
                                                        <p className="m-0 text-muted font-size-14">Amount</p>
                                                    </td>
                                                    <td>
                                                        10/11/2016
                                                        <p className="m-0 text-muted font-size-14">Date</p>
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <img src="assets/images/users/user-4.jpg" alt="user"
                                                            className="avatar-xs rounded-circle me-2" /> Nikolaj S.
                                                        Henriksen
                                                    </td>
                                                    <td><i className="mdi mdi-checkbox-blank-circle text-success"></i>
                                                        Confirm</td>
                                                    <td>
                                                        $954
                                                        <p className="m-0 text-muted font-size-14">Amount</p>
                                                    </td>
                                                    <td>
                                                        8/11/2016
                                                        <p className="m-0 text-muted font-size-14">Date</p>
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <img src="assets/images/users/user-5.jpg" alt="user"
                                                            className="avatar-xs rounded-circle me-2" /> Lasse C. Overgaard
                                                    </td>
                                                    <td><i className="mdi mdi-checkbox-blank-circle text-danger"></i>
                                                        Payment expired</td>
                                                    <td>
                                                        $44,584
                                                        <p className="m-0 text-muted font-size-14">Amount</p>
                                                    </td>
                                                    <td>
                                                        7/11/2016
                                                        <p className="m-0 text-muted font-size-14">Date</p>
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <img src="assets/images/users/user-6.jpg" alt="user"
                                                            className="avatar-xs rounded-circle me-2" /> Kasper S. Jessen
                                                    </td>
                                                    <td><i className="mdi mdi-checkbox-blank-circle text-success"></i>
                                                        Confirm</td>
                                                    <td>
                                                        $8,844
                                                        <p className="m-0 text-muted font-size-14">Amount</p>
                                                    </td>
                                                    <td>
                                                        1/11/2016
                                                        <p className="m-0 text-muted font-size-14">Date</p>
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Latest Orders</h4>

                                    <div className="table-responsive">
                                        <table
                                            className="table align-middle table-centered table-vertical table-nowrap mb-1">

                                            <tbody>
                                                <tr>
                                                    <td>#12354781</td>
                                                    <td>
                                                        <img src="assets/images/users/user-1.jpg" alt="user"
                                                            className="avatar-xs me-2 rounded-circle" /> Riverston Glass
                                                        Chair
                                                    </td>
                                                    <td><span className="badge rounded-pill bg-success">Delivered</span>
                                                    </td>
                                                    <td>
                                                        $185
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>#52140300</td>
                                                    <td>
                                                        <img src="assets/images/users/user-2.jpg" alt="user"
                                                            className="avatar-xs me-2 rounded-circle" /> Shine Company
                                                        Catalina
                                                    </td>
                                                    <td><span className="badge rounded-pill bg-success">Delivered</span>
                                                    </td>
                                                    <td>
                                                        $1,024
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>#96254137</td>
                                                    <td>
                                                        <img src="assets/images/users/user-3.jpg" alt="user"
                                                            className="avatar-xs me-2 rounded-circle" /> Trex Outdoor
                                                        Furniture Cape
                                                    </td>
                                                    <td><span className="badge rounded-pill bg-danger">Cancel</span></td>
                                                    <td>
                                                        $657
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>#12365474</td>
                                                    <td>
                                                        <img src="assets/images/users/user-4.jpg" alt="user"
                                                            className="avatar-xs me-2 rounded-circle" /> Oasis Bathroom Teak
                                                        Corner
                                                    </td>
                                                    <td><span className="badge rounded-pill bg-warning">Shipped</span></td>
                                                    <td>
                                                        $8451
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>#85214796</td>
                                                    <td>
                                                        <img src="assets/images/users/user-5.jpg" alt="user"
                                                            className="avatar-xs me-2 rounded-circle" /> BeoPlay Speaker
                                                    </td>
                                                    <td><span className="badge rounded-pill bg-success">Delivered</span>
                                                    </td>
                                                    <td>
                                                        $584
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>#12354781</td>
                                                    <td>
                                                        <img src="assets/images/users/user-6.jpg" alt="user"
                                                            className="avatar-xs me-2 rounded-circle" /> Riverston Glass
                                                        Chair
                                                    </td>
                                                    <td><span className="badge rounded-pill bg-success">Delivered</span>
                                                    </td>
                                                    <td>
                                                        $185
                                                    </td>
                                                    <td>
                                                        5/12/2016
                                                    </td>
                                                    <td>
                                                        <button type="button"
                                                            className="btn btn-secondary btn-sm waves-effect waves-light">Edit</button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end row  */}


                </div>
                {/* container-fluid  */}
            </div>
        )
    }

}

export default Content