import express from "express";
import reviewController from '../../controllers/review.controller.mjs';
import validate from '../../middlewares/validate.mjs';
import {createReviewValidation,deleteReviewValidation} from '../../validations/review.validation.mjs';

const reviewRouter = express.Router();

reviewRouter.post('/create', validate(createReviewValidation), reviewController.createReview);
reviewRouter.get('/all', reviewController.getAllReviews);
reviewRouter.get('/id/:id', reviewController.getReviewByUserID);
reviewRouter.get('/rating/:rating', reviewController.getReviewByRating);
reviewRouter.get('/date/:date', reviewController.getReviewByDateAdded);
reviewRouter.delete('/delete/:id', validate(deleteReviewValidation), reviewController.deleteReview);

export default reviewRouter;