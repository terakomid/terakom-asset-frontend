import React, { Component } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      color: '#5F6368',
      font: {
        size: 19,
        weight: 'bold'
      },
      text: 'Total Asset Per Category',
      padding: {
        bottom: 50
      },
      position: 'top',
      align: 'start'
    }
  },
  scales: {
    y: {
      position: 'right',
      ticks: {
        align: 'center',
        padding: 1
      },
      grid: {
        display: true,
        borderDash: [10, 10],
        borderWidth: 0,
        borderDashOffset: 0.0
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#5F6368',
        font: {
          weight: 'bold'
        },
        padding: 5
      }
    }
  }
};

const labels = ['Land', 'Building', 'Equipment', ['Vehicle', '(4 Wheels)'], ['Vehicle', '(2 Wheels)'], 'Computers', ['Furniture', 'Fixture'], 'Tools', ['Intangible', 'Asset'], 'Construction'];

export const data = {
  labels,
  datasets: [
    {
      id: 1,
      label: 'Asset',
      data: [90, 25, 79, 83, 150, 53, 67, 55, 45, 33],
      backgroundColor: 'rgba(7, 82, 143, 1)',
    }
  ],
};

class ChartTotalAssetByCategory extends Component {

  render() {
    return (
      <div className='card shadow-sm'>
        <div className='card-body p-3 h-500px'>
          <Bar options={options} data={data} />
        </div>
      </div>
    )
  }

}

export default ChartTotalAssetByCategory