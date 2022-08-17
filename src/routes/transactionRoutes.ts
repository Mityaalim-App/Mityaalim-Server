import express from 'express';
import requireLogin from '../middlewares/requireLogin';

module.exports = (app: express.Application) => {

   // list of user transactions from current month:
   app.get('/api/transactions', requireLogin, async (req, res) => {

   });

   // list of all user transactions:
   app.get('/api/transactions/all', requireLogin, async (req, res) => {

   });

   // creating a new transaction:
   app.post('/api/transactions', requireLogin, async (req, res) => {
      // update transaction model 
      // update budget model: total income, expenses
   });

   // updating an existing transaction:
   app.put('/api/transactions/:id', requireLogin, async (req, res) => {
      // update transaction model 
      // update budget model: total income, expenses
   });

   // deleting a transaction from database:
   app.delete('/api/transactions/:id', requireLogin, async (req, res) => {
      // update transaction model 
      // update budget model: total income, expenses
   });
};