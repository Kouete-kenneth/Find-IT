// routes/index.mjs

import express from 'express';
import authRoute from './auth.route.mjs';
import userRoute from './user.route.mjs';
import notificationRoute from './notification.route.mjs'
import docsRoute from './docs.route.mjs';
import config from '../../config/config.mjs';
import heroRoutes from './hero.route.mjs'
import Storageroutes from './imageStorage.route.mjs';
import Itemsroutes from './items.route.mjs';
import Emailroutes from './email.route.mjs';
import Marchroutes from './match.route.mjs';
import FAQRoutes from './faq.routes.mjs';
import reviewRoutes from './review.route.mjs';
import historyRoutes from './history.route.mjs';
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
  {
    path: '/storage',
    route: Storageroutes,
  },
  {
    path: '/items',
    route: Itemsroutes,
  },
  {
    path: '/emails',
    route: Emailroutes,
  },
  {
    path: '/match',
    route: Marchroutes,
  },

  {
    path: '/review',
    route: reviewRoutes,
  },
  {
    path: '/faqs',
    route: FAQRoutes,
  },
  {
    path: '/history',
    route: historyRoutes,
  },
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