// routes/index.mjs

import express from 'express';
import authRoute from './auth.route.mjs';
import userRoute from './user.route.mjs';
import notificationRoute from './notification.route.mjs'
import docsRoute from './docs.route.mjs';
import config from '../../config/config.mjs';
import heroRoutes from './hero.route.mjs'

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/hero',
    route: heroRoutes,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
  // {
  //   path: '/cart',
  //   route: cartRoute,
  // },
  // {
  //   path: '/favourite',
  //   route: favouriteRoute,
  // },
  // {
  //   path: '/order',
  //   route: orderRoute,
  // },
  // {
  //   path: '/payment',
  //   route: paymentRoute,
  // },

  // {
  //   path: '/review',
  //   route: reviewRoute,
  // },
  // {
  //   path: '/testimonial',
  //   route: testimonialRoute,
  // },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach(({ path, route }) => {
    router.use(path, route);
  });
}

export default router;