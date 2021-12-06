import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  // We can use the seeds hook to set initial data in your database.
  seeds(server) {
    server.db.loadData({
      // model name in plural form.
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-11-03 09:28:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdrawn',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-11-01 09:28:00')
        }
      ]
    })
  },

  routes() {
    // e.g: localhost:3000/`api`
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      // schema -> database;

      // request.requestBody returns the body in string format.
      const data = JSON.parse(request.requestBody);

      // transaction -> Model
      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);