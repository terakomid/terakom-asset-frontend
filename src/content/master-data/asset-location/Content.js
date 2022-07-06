// Content.js
import React, { Component } from 'react';

// Filter Dashboard
import AssetLocation from './AssetLocation';

class Content extends Component {

    render() {
        return (

            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className='row'>

                            {/* Asset Location */}
                            <div className="col-xl-12 col-sm-12 py-3">
                                <AssetLocation />
                            </div>

                        </div>

                    </div>
                    {/* container-fluid  */}
                </div >
            </div>
        )
    }

}

export default Content