/*
  this is entry point for application,
  here we importing our app singleton then we import all features,
  then we adding them and then we staring server
*/

import app from './app';
import Github from './features/Github';

app.addFeature(Github)

app.start();

export default app;
