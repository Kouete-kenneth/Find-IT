// import express from 'express';
// import multer from 'multer';
// import pngparse from 'pngparse';
// // import imagesearch from 'imagesearch';
// import axios from 'axios';
// import fs from 'fs/promises';
// import { unlink } from 'fs/promises';
import express from 'express';
// const upload = multer({ dest: 'uploads/' });
import stringSimilarity from 'string-similarity'
const router = express.Router();
router.post('/'/*, upload.single('image')*/, async (req, res) => {
//   const uploadedImagePath = req.file.path;
    // const {sentence1, sentence2}=req.body
    const { targetimage, matchArray } = req.body;
   try {
    // const similarity = stringSimilarity.compareTwoStrings(sentence1, sentence2);
    const matches = stringSimilarity.findBestMatch(targetimage,matchArray);
      res.send(matches);
   } catch (error) {
    res.send(error.message);
   }

//   const imageUrls = [
//     // List of image URLs to compare with
//     'https://cloud.appwrite.io/v1/storage/buckets/bucketId/files/fileId/view?project=projectId',
//     'https://cloud.appwrite.io/console/project-665df1ef0031b59f137e/storage/bucket-668a965e003a0df0cf74/file-668bfdb10032b249c1a8'
//     // Add more URLs as needed
//   ];

//   try {
//     const results = await compareImages(uploadedImagePath, imageUrls);
//     res.json(results);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }



});

// const compareImages = async (uploadedImagePath, imageUrls) => {
//   const uploadedImage = await parsePng(uploadedImagePath);
  
//   const downloadAndParseImage = async (url) => {
//     const response = await axios({ url, responseType: 'arraybuffer' });
//     const filePath = `temp_${Date.now()}.png`;
//     await fs.writeFile(filePath, response.data);
//     const image = await parsePng(filePath);
//     await unlink(filePath);
//     return image;
//   };

//   for (const url of imageUrls) {
//     const template = await downloadAndParseImage(url);
//     const result = await new Promise((resolve, reject) => {
//     //   imagesearch(uploadedImage, template, (error, results) => {
//     //     if (error) reject(error);
//     //     resolve(results);
//     //   });
//     });

//     if (result && result.match) {
//       return { match: true, url };
//     }
//   }
  
//   return { match: false };
// };

// const parsePng = (filePath) => {
//   return new Promise((resolve, reject) => {
//     pngparse.parseFile(filePath, (error, image) => {
//       if (error) reject(error);
//       resolve(image);
//     });
//   });
// };

export default router