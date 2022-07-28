import React, { Component } from 'react';

class TotalAssetNonIT extends Component {

  render() {
    return (
      <div className="card shadow-sm">
        <div className="card-body h-300px">
          <h4 className="card-title mb-4 pt-2 fs-4 fw-bold">Total Asset Non IT</h4>

          <div className='text-center'>
            <i className='bi bi-folder-check fs-1-dashboard text-secondary'></i>
          </div>
          <div className="row text-left mt-3">
            <div className="col-md-9 col-9">
              <h2 className="text-bold fs-1-dashboard">1.458</h2>
            </div>
            <div className="col-md-3 col-3">
              <i className='bi bi-bar-chart-fill fs-1-dashboard text-primary'></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default TotalAssetNonIT