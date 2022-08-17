import express from 'express';
import requireLogin from '../middlewares/requireLogin';

module.exports = (app: express.Application) => {

   // current goals achieved this week:
   app.get('/api/goals', requireLogin, async (req, res) => {
      
   });

   // record user progress in fulfilling goals and add credits:
   app.post('/api/goals', requireLogin, async (req, res) => {
      
   });

   //should implement logic to reset goals each Sunday:
   app.delete('/api/goals', requireLogin, async (req, res) => {
      
   });
};