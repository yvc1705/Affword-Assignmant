import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './components/Login/Login';
import AllFeed from './components/TaskComponents/FeedComponents/AllFeed';
import AllTasks from './components/TaskComponents/AllTasks';
import CreateTasks from './components/TaskComponents/CreateTask/CreateTasks';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/tasks/create" element={<CreateTasks />} />
            <Route path="/feed" element={<AllFeed />} />
          </Routes>
    <App />
  </BrowserRouter>
);
