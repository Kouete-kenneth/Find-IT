import FAQ from "../models/faq.model.mjs";

/**
 * Create a new FAQ
 * @param {object} faqData 
 * @returns {Promise<object>}
 */
const createFAQ = async (faqData) => {
  try {
    const faq = await FAQ.create(faqData);
    return faq;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating FAQ");
  }
};

/**
 * Get all FAQs
 * @returns {Promise<Array>}
 */
const getAllFAQ = async () => {
  try {
    const allFAQ = await FAQ.find({});
    return allFAQ;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching FAQ");
  }
};

/**
 * Delete FAQ by MongoDB _id
 * @param {string} id
 * @returns {Promise<object>}
 */
const deleteFAQ = async (faqId) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(faqId);

    if (!deletedFAQ) {
      throw new Error(`Couldn't find FAQ with id: ${faqId}`);
    }

    return deletedFAQ;
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    throw new Error('Error deleting FAQ');
  }
};


/**
 * Update an FAQ by MongoDB _id
 * @param {string} faqId
 * @param {object} updatedData
 * @returns {Promise<object>}
 */
const updateFAQ = async (faqId, updatedData) => {
    const updatedFAQ = await FAQ.findByIdAndUpdate(faqId, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedFAQ) {
      throw new Error(`Couldn't find FAQ with id: ${faqId}`);
      return
    }

    return updatedFAQ;
};


export { createFAQ, getAllFAQ, deleteFAQ, updateFAQ };
