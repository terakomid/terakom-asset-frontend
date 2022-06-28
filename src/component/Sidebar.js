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
                            <li className="menu-title" role="menuitem">Main</li>

                            <li role="menuitem">
                                <a href="index.html" className="waves-effect">
                                    <i className="mdi mdi-view-dashboard"></i>
                                    <span className="badge rounded-pill bg-primary float-end">2</span>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <li role="menuitem">
                                <a href="calendar.html" className=" waves-effect">
                                    <i className="mdi mdi-calendar-check"></i>
                                    <span>Calendar</span>
                                </a>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-email-outline"></i>
                                    <span>Email</span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem"><a href="email-inbox.html">Inbox</a></li>
                                    <li role="menuitem"><a href="email-read.html">Email Read</a></li>
                                    <li role="menuitem"><a href="email-compose.html">Email Compose</a></li>
                                </ul>
                            </li>

                            <li className="menu-title" role="menuitem">Components</li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-buffer"></i>
                                    <span>UI Elements</span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="ui-alerts.html">Alerts</a></li>
                                    <li role="menuitem"><a href="ui-buttons.html">Buttons</a></li>
                                    <li role="menuitem"><a href="ui-badge.html">Badge</a></li>
                                    <li role="menuitem"><a href="ui-cards.html">Cards</a></li>
                                    <li role="menuitem"><a href="ui-carousel.html">Carousel</a></li>
                                    <li role="menuitem"><a href="ui-dropdowns.html">Dropdowns</a></li>
                                    <li role="menuitem"><a href="ui-grid.html">Grid</a></li>
                                    <li role="menuitem"><a href="ui-images.html">Images</a></li>
                                    <li role="menuitem"><a href="ui-lightbox.html">Lightbox</a></li>
                                    <li role="menuitem"><a href="ui-modals.html">Modals</a></li>
                                    <li role="menuitem"><a href="ui-offcanvas.html">Offcanvas</a></li>
                                    <li role="menuitem"><a href="ui-pagination.html">Pagination</a></li>
                                    <li role="menuitem"><a href="ui-popover-tooltips.html">Popover &amp; Tooltips</a></li>
                                    <li role="menuitem"><a href="ui-rangeslider.html">Range Slider</a></li>
                                    <li role="menuitem"><a href="ui-session-timeout.html">Session Timeout</a></li>
                                    <li role="menuitem"><a href="ui-progressbars.html">Progress Bars</a></li>
                                    <li role="menuitem"><a href="ui-sweet-alert.html">Sweet-Alert</a></li>
                                    <li role="menuitem"><a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a></li>
                                    <li role="menuitem"><a href="ui-typography.html">Typography</a></li>
                                    <li role="menuitem"><a href="ui-video.html">Video</a></li>
                                </ul>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="waves-effect">
                                    <i className="mdi mdi-clipboard-outline"></i>
                                    <span className="badge rounded-pill bg-success float-end">6</span>
                                    <span>Forms</span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="form-elements.html">Form Elements</a></li>
                                    <li role="menuitem"><a href="form-validation.html">Form Validation</a></li>
                                    <li role="menuitem"><a href="form-advanced.html">Form Advanced</a></li>
                                    <li role="menuitem"><a href="form-editors.html">Form Editors</a></li>
                                    <li role="menuitem"><a href="form-uploads.html">Form File Upload</a></li>
                                    <li role="menuitem"><a href="form-xeditable.html">Form Xeditable</a></li>
                                </ul>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-chart-line"></i>
                                    <span>Charts</span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="charts-morris.html">Morris Chart</a></li>
                                    <li role="menuitem"><a href="charts-chartist.html">Chartist Chart</a></li>
                                    <li role="menuitem"><a href="charts-chartjs.html">Chartjs Chart</a></li>
                                    <li role="menuitem"><a href="charts-flot.html">Flot Chart</a></li>
                                    <li role="menuitem"><a href="charts-c3.html">C3 Chart</a></li>
                                    <li role="menuitem"><a href="charts-other.html">Jquery Knob Chart</a></li>
                                </ul>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-format-list-bulleted-type"></i>
                                    <span>Tables</span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="tables-basic.html">Basic Tables</a></li>
                                    <li role="menuitem"><a href="tables-datatable.html">Data Table</a></li>
                                    <li role="menuitem"><a href="tables-responsive.html">Responsive Table</a></li>
                                    <li role="menuitem"><a href="tables-editable.html">Editable Table</a></li>
                                </ul>
                            </li>



                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-album"></i>
                                    <span>Icons</span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="icons-material.html">Material Design</a></li>
                                    <li role="menuitem"><a href="icons-ion.html">Ion Icons</a></li>
                                    <li role="menuitem"><a href="icons-fontawesome.html">Font Awesome</a></li>
                                    <li role="menuitem"><a href="icons-themify.html">Themify Icons</a></li>
                                    <li role="menuitem"><a href="icons-dripicons.html">Dripicons</a></li>
                                    <li role="menuitem"><a href="icons-typicons.html">Typicons Icons</a></li>
                                </ul>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="waves-effect">
                                    <span className="badge rounded-pill bg-danger float-end">2</span>
                                    <i className="mdi mdi-google-maps"></i>
                                    <span>Maps</span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="maps-google.html"> Google Map</a></li>
                                    <li role="menuitem"><a href="maps-vector.html"> Vector Map</a></li>
                                </ul>
                            </li>

                            <li className="menu-title" role="menuitem">Extras</li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-responsive"></i>
                                    <span> Layouts </span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem" aria-haspopup="true">
                                        <a href="#link" className="has-arrow">Vertical</a>
                                        <ul className="sub-menu" role="menu">
                                            <li role="menuitem"><a href="layouts-light-sidebar.html">Light Sidebar</a></li>
                                            <li role="menuitem"><a href="layouts-compact-sidebar.html">Compact Sidebar</a></li>
                                            <li role="menuitem"><a href="layouts-icon-sidebar.html">Icon Sidebar</a></li>
                                            <li role="menuitem"><a href="layouts-boxed.html">Boxed Layout</a></li>
                                            <li role="menuitem"><a href="layouts-preloader.html">Preloader</a></li>
                                            <li role="menuitem"><a href="layouts-colored-sidebar.html">Colored Sidebar</a></li>
                                        </ul>
                                    </li>

                                    <li role="menuitem" aria-haspopup="true">
                                        <a href="#link" className="has-arrow">Horizontal</a>
                                        <ul className="sub-menu" role="menu">
                                            <li role="menuitem"><a href="layouts-horizontal.html">Horizontal</a></li>
                                            <li role="menuitem"><a href="layouts-hori-topbar-dark.html">Topbar Dark</a></li>
                                            <li role="menuitem"><a href="layouts-hori-preloader.html">Preloader</a></li>
                                            <li role="menuitem"><a href="layouts-hori-boxed-width.html">Boxed Layout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-account-box"></i>
                                    <span> Authentication </span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="pages-login.html">Login</a></li>
                                    <li role="menuitem"><a href="pages-register.html">Register</a></li>
                                    <li role="menuitem"><a href="pages-recoverpw.html">Recover Password</a></li>
                                    <li role="menuitem"><a href="pages-lock-screen.html">Lock Screen</a></li>
                                </ul>
                            </li>

                            <li role="menuitem">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-text-box-multiple-outline"></i>
                                    <span> Extra Pages </span>
                                </a>
                                <ul className="sub-menu" role="menu" >
                                    <li role="menuitem"><a href="pages-timeline.html">Timeline</a></li>
                                    <li role="menuitem"><a href="pages-invoice.html">Invoice</a></li>
                                    <li role="menuitem"><a href="pages-directory.html">Directory</a></li>
                                    <li role="menuitem"><a href="pages-blank.html">Blank Page</a></li>
                                    <li role="menuitem"><a href="pages-404.html">Error 404</a></li>
                                    <li role="menuitem"><a href="pages-500.html">Error 500</a></li>
                                </ul>
                            </li>



                            <li role="menuitem" aria-haspopup="true">
                                <a href="#link" className="has-arrow waves-effect">
                                    <i className="mdi mdi-share-variant"></i>
                                    <span>Multi Level</span>
                                </a>
                                <ul className="sub-menu" role="menu">
                                    <li role="menuitem"><a href="#link">Level 1.1</a></li>
                                    <li role="menuitem" aria-haspopup="true"><a href="#link" className="has-arrow">Level 1.2</a>
                                        <ul className="sub-menu" role="menu">
                                            <li role="menuitem"><a href="#link">Level 2.1</a></li>
                                            <li role="menuitem"><a href="#link">Level 2.2</a></li>
                                        </ul>
                                    </li>
                                </ul>
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