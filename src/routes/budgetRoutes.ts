import express from 'express';
import requireLogin from '../middlewares/requireLogin';

module.exports = (app: express.Application) => {

   // current monthly budget balance:
   app.get('/api/budget', requireLogin, async (req, res) => {
      // fetch total income, expenses and savings target from database
   });

   // add user's monthly savings-target - should accur each month:
   app.post('/api/budget/savings-target', requireLogin, async (req, res) => {
      // implement logic to create a new model instance each calendar month
   });

   // update user's monthly savings-target:
   app.put('/api/budget/savings-target', requireLogin, async (req, res) => {
      
   });
};