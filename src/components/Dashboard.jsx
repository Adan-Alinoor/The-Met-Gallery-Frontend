import React from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import BalanceIcon from '@mui/icons-material/AccountBalanceWallet';
import BudgetIcon from '@mui/icons-material/TrendingUp';

const Dashboard = ({ balance = 50000, budget = 40000 }) => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Budget',
        data: [4000, 4500, 3000, 3500, 5000],
        backgroundColor: 'rgba(0, 51, 102, 0.5)',
        borderColor: '#003366',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Ksh ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mainpage-container">
      <div className="main-content">
        <div className="info-container">
          <div className="info-item balance">
            <BalanceIcon className="icon" />
            <h2>Balance</h2>
            <p>Ksh {balance.toFixed(2)}</p>
            <div className="tooltip">Your current balance</div>
          </div>
          <div className="info-item budget">
            <BudgetIcon className="icon" style={{ fontSize: '50px' }} />
            <h2>Budget</h2>
            <p>Ksh {budget.toFixed(2)}</p>
            <div>Your budget for the period</div>
            <div className="progress-bar">
              <span style={{ width: `${(balance / budget) * 100}%` }}></span>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h2>Budget Overview</h2>
          <Line data={chartData} options={options} />
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <ul>
            <li>
              <span className="transaction-description">Payment from client</span>
              <span className="transaction-amount positive">Ksh 500</span>
            </li>
            <li>
              <span className="transaction-description">Office supplies</span>
              <span className="transaction-amount negative">Ksh -120</span>
            </li>
            <li>
              <span className="transaction-description">Monthly rent</span>
              <span className="transaction-amount negative">Ksh -1500</span>
            </li>
            <li>
              <span className="transaction-description">Payment from client</span>
              <span className="transaction-amount positive">Ksh 500</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
