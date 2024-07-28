import { MatchDescription } from "../services/match.service.mjs";

/**
 * Handles the matching request.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const matchDescriptionsController = async (req, res) => {
  const { targetimage, matchArray } = req.body;
  const matchDescArray = matchArray.map((text) => text.toLowerCase());
  const targetDescription = targetimage.toLowerCase();

  try {
    const matches = MatchDescription(targetDescription, matchDescArray);
    res.send(matches);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export{
    matchDescriptionsController
}