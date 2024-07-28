import express from "express";
import FAQController from '../../controllers/faq.Controller.mjs';
import validate from '../../middlewares/validate.mjs';
import {createFAQValidation,updateFAQValidation,deleteFAQValidation} from '../../validations/faq.validation.mjs';

const FAQRouter = express.Router();

FAQRouter.post('/create', validate(createFAQValidation), FAQController.createFAQ);
FAQRouter.get('/fetchAll', FAQController.getAllFAQ);
FAQRouter.delete('/delete/:id', validate(deleteFAQValidation), FAQController.deleteFAQ);
FAQRouter.put('/update/:id', validate(updateFAQValidation), FAQController.updateFAQ);

export default FAQRouter;