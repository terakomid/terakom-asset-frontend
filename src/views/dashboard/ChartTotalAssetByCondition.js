import React, { Component } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'left',
      labels: {
        usePointStyle: true,
        boxWidth: 6
      }
    },
    title: {
      display: true,
      color: '#5F6368',
      font: {
        size: 19.5,
        weight: '600'
      },
      text: 'Total Asset Per Condition',
      position: 'top',
      align: 'start'
    }
  }
};

export const data = {
  labels: ['Baik/Layak', 'Rusak', 'Write Off SAP', 'Disposal', 'Not Identify/Lost'],
  datasets: [
    {
      label: '# of Votes',
      data: [40, 25, 20, 10, 5],
      backgroundColor: [
        'rgba(7, 82, 143, 1)',
        'rgba(0, 180, 215, 1)',
        'rgba(145, 224, 239, 1)',
        'rgba(252, 230, 29, 1)',
        'rgba(217, 217, 217, 1)',
      ],
      borderColor: [
        'rgba(7, 82, 143, 1)',
        'rgba(0, 180, 215, 1)',
        'rgba(145, 224, 239, 1)',
        'rgba(252, 230, 29, 1)',
        'rgba(217, 217, 217, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

class ChartTotalAssetByCondition extends Component {

  render() {
    return (
      <div className='card shadow-sm'>
        <div className='card-body h-300px'>
          <Pie options={options} data={data} />
        </div>
      </div>
    )
  }

}

export default ChartTotalAssetByCondition