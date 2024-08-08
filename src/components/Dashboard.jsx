import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import { Palette as ArtBudgetIcon, Event as EventBudgetIcon, AccountBalance as BalanceIcon } from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [artBudget, setArtBudget] = useState(30000);
  const [eventBudget, setEventBudget] = useState(20000);
  const [balance, setBalance] = useState(50000);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Art Budget',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Event Budget',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });
  const [transactions, setTransactions] = useState({ artworks: [], events: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/budgets');
        const budgetData = await response.json();

        setArtBudget(budgetData.artBudget);
        setEventBudget(budgetData.eventBudget);
        setBalance(budgetData.balance);

        const responseTransactions = await fetch('/api/transactions');
        const transactionsData = await responseTransactions.json();

        setTransactions({
          artworks: transactionsData.artworks,
          events: transactionsData.events,
        });

        setChartData({
          labels: budgetData.chartLabels,
          datasets: [
            {
              label: 'Art Budget',
              data: budgetData.artBudgetData,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Event Budget',
              data: budgetData.eventBudgetData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          <div className="info-item art-budget">
            <ArtBudgetIcon className="icon" />
            <h2>Art Budget</h2>
            <p>Ksh {artBudget.toFixed(2)}</p>
            <div className="tooltip">Your art budget for the period</div>
            <div className="progress-bar">
              <span style={{ width: `${(artBudget / 40000) * 100}%` }}></span>
            </div>
          </div>
          <div className="info-item event-budget">
            <EventBudgetIcon className="icon" />
            <h2>Event Budget</h2>
            <p>Ksh {eventBudget.toFixed(2)}</p>
            <div className="tooltip">Your event budget for the period</div>
            <div className="progress-bar">
              <span style={{ width: `${(eventBudget / 40000) * 100}%` }}></span>
            </div>
          </div>
          <div className="info-item balance">
            <BalanceIcon className="icon" />
            <h2>Balance</h2>
            <p>Ksh {balance.toFixed(2)}</p>
            <div className="tooltip">Your remaining balance after expenses</div>
            <div className="progress-bar">
              <span style={{ width: `${(balance / 100000) * 100}%` }}></span>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h2>Budget Overview</h2>
          <Line data={chartData} options={options} />
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <div className="transactions-category">
            <h3>Artworks</h3>
            <ul>
              {transactions.artworks.map((transaction, index) => (
                <li key={index}>
                  <span className="transaction-description">{transaction.description}</span>
                  <span className={`transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                    Ksh {transaction.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="transactions-category">
            <h3>Events</h3>
            <ul>
              {transactions.events.map((transaction, index) => (
                <li key={index}>
                  <span className="transaction-description">{transaction.description}</span>
                  <span className={`transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                    Ksh {transaction.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
