// Sidebar.js

import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className="vertical-menu">

                <div data-simplebar className="h-100">

                    {/* Sidemenu  */}
                    <div id="sidebar-menu" role="menubar">
                        {/* Left Menu Start  */}
                        <ul className="metismenu list-unstyled" id="side-menu" role="menu" aria-label="functions">

                            {/* Dashboard */}
                            <li role="menuitem">
                                <a href="/" className="waves-effect">
                                    <i className="mdi mdi-home"></i>
                                    {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                                    <span className="text-capitalize">dashboard</span>
                                </a>
                            </li>

                            {/* User Management */}
                            <li role="menuitem">
                                <a href="/#manajemen-user" className="has-arrow waves-effect">
                                    <i className="mdi mdi-account-circle"></i>
                                    <span className="text-capitalize">user management</span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem"><a href="/#level-user" className='text-capitalize'>user level</a></li>
                                    <li role="menuitem"><a href="/#list-user" className='text-capitalize'>user list</a></li>
                                </ul>
                            </li>

                            {/* Master Data */}
                            <li role="menuitem">
                                <a href="/#" className="has-arrow waves-effect">
                                    <i className="mdi mdi-note-multiple"></i>
                                    <span className="text-capitalize">master data</span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>asset location</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>asset category</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>asset condition</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>cost center</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>department</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>vendor name</a></li>
                                </ul>
                            </li>

                            {/* Data Asset */}
                            <li role="menuitem">
                                <a href="/#data-asset" className="has-arrow waves-effect">
                                    <i className="mdi mdi-folder-table"></i>
                                    <span className="text-capitalize">data asset</span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>data asset</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>history asset</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>purchase request</a></li>
                                </ul>
                            </li>

                            {/* Qr Code Tagging */}
                            <li role="menuitem">
                                <a href="/#" className="waves-effect">
                                    <i className="mdi mdi-qrcode"></i>
                                    {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                                    <span className="text-capitalize">qrcode tagging</span>
                                </a>
                            </li>

                            {/* Penghapusan Asset */}
                            <li role="menuitem">
                                <a href="/#" className="waves-effect">
                                    <i className="mdi mdi-trash-can"></i>
                                    {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                                    <span className="text-capitalize">penghapusan asset</span>
                                </a>
                            </li>

                            {/* Laporan */}
                            <li role="menuitem">
                                <a href="/#" className="has-arrow waves-effect">
                                    <i className="mdi mdi-chart-line"></i>
                                    <span className="text-capitalize">laporan</span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>activity log</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>asset lost</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>data asset</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>maintenance asset</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>penghapusan asset</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>penyusutan asset</a></li>
                                    <li role="menuitem"><a href="/#" className='text-capitalize'>transfer/mutation assset</a></li>
                                </ul>
                            </li>

                            {/* Help */}
                            <li role="menuitem">
                                <a href="/#" className="waves-effect">
                                    <i className="mdi mdi-help-circle"></i>
                                    {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                                    <span className="text-capitalize">help</span>
                                </a>
                            </li>

                            {/* Activity Log */}
                            <li role="menuitem">
                                <a href="/#" className="waves-effect">
                                    <i className="mdi mdi-login"></i>
                                    {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                                    <span className="text-capitalize">activity log</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                    {/* Sidebar  */}
                </div>
            </div>
        )
    }
}

export default  Sidebar