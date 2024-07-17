import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required().description('Mongo DB url'),
  APPWRITE_PROJECT_ID:Joi.string().description('Appwrite project id'),
  APPWRITE_API_ENDPOINT:Joi.string().description('Appwrite project Api end point'),
  APPWRITE_API_KEY:Joi.string().description('Appwrite  API secrete Key'),
  APPWRITE_BUNDLE_NAME:Joi.string().description('Appwrite  PROJECT PLATFORM BUNDLE NAME'),
  APPWRITE_BUCKET_ID:Joi.string().description('Appwrite'),
  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_SERVICE:Joi.string().description('service used in sending the email'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().trim().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  SMTP_SECURE:Joi.boolean().description('determine whether the secure property is trus or false'),
  EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  SESSION_ID: Joi.string().default('sid'),
  SESSION_SECRET: Joi.string().default('secrete!session'),
  SESSION_LIFETIME: Joi.number().default(7200000), // 2 hours 1000 * 60 * 60 * 2
}).unknown();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // writeConcern: {w:'majorityAppleProduct-operationalDB'},
      // useFindAndModify: false
    },
    databaseName: envVars.DB_NAME
  },
  session:{
    id:envVars.SESSION_ID,
    secret:envVars.SESSION_SECRET,
    lifeTime:envVars.SESSION_LIFETIME,
  }
  ,
  jwt: {
    secret: envVars.JWT_SECRET, 
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      service:envVars.SMTP_SERVICE,
      port: envVars.SMTP_PORT,
      secure:envVars.SMTP_SECURE,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
      tls:{rejectUnauthorized:true}
    },
    from: envVars.EMAIL_FROM,
  },
  appwriteStorage:{
    projectID:envVars.APPWRITE_PROJECT_ID,
    apiEndpoint:envVars.APPWRITE_API_ENDPOINT,
    key:envVars.APPWRITE_API_KEY,  
    bundle:envVars.APPWRITE_BUNDLE_NAME,
    bucketID:envVars.APPWRITE_BUCKET_ID,
  }
};

export default config;
