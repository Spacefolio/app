// import { exec } from 'child_process';
// import { Router } from 'express';

// const router = Router();

// router.post('/sync', (req, res, next) => [
//   exec('git pull && npm run post-deploy', (err, stdout, stderr) => {
//     if (err) {
//       //some err occurred
//       console.error(err);
//       res.status(403).send(err);
//     } else {
//       // the *entire* stdout and stderr (buffered)
//       console.log(`stdout: ${stdout}`);
//       console.log(`stderr: ${stderr}`);
//       res.status(200).send(`Auto deploy completed ${stdout} ${stderr}`);
//     }
//   });
// ]);

// function validateSecret(req, res, next) {
//   /**
//    * Passing an argument to next() in middleware
//    * throws an error to the error handler automatically
//    */

//   const payload = JSON.stringify(req.body);
//   if (!payload) {
//     return next('Request body empty');
//   }
//   let sig =
//     'sha1=' +
//     crypto
//       .createHmac('sha1', process.env.WEBHOOK_SECRET)
//       .update(payload)
//       .digest('hex');
//   if (req.headers['x-hub-signature'] == sig) {
//     return next();
//   } else {
//     return next('Signatures did not match');
//   }
// }

// export { router as redeployRouter };
