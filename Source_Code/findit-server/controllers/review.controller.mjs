import httpStatus from "http-status";
import {createReview, getAllReviews,deleteReview,getReviewByUserID, getReviewByRating, getReviewByDateAdded,
} from "../services/review.service.mjs";

const reviewController = {
  createReview: async (req, res) => {
    try {
      const newReview = await createReview(req.body);
      res.status(httpStatus.CREATED).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating review");
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviewData = await getAllReviews();
      res.status(httpStatus.OK).json(reviewData);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching reviews");
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { review_id } = req.params;
      const result = await deleteReview(review_id);

      res.status(httpStatus.OK).send(result);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error deleting review");
    }
  },

  getReviewByUserID: async (req,res) => {
    try {
      const { id } = req.params;
      const reviews = await getReviewByUserID(id);

      res.status(httpStatus.OK).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching review by username");
    }
  },
  getReviewByRating: async (req, res) => {
    try {
      const { rating } = req.params;
      const reviews = await getReviewByRating(rating);

      res.status(httpStatus.OK).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching reviews by rating");
    }
  },

  getReviewByDateAdded: async (req, res) => {
    try {
      const  date  = new Date(req.params.date);

      const reviews = await getReviewByDateAdded(date);

      res.status(httpStatus.OK).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching reviews by date");
    }
  },
};

export default reviewController;