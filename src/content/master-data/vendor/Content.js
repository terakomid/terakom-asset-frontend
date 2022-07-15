// Content.js
import React, { Component } from 'react'

// Form
import Form from './Form'


class Content extends Component {

    render() {
        return (

            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className='row'>

                            <div className='card'>
                                <div className='card-body p-3'>

                                        {/* Form */}
                                        <div className='col-xl-12 col-12 mt-3'>
                                            <Form />
                                        </div>
                                </div>
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