require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongodb_pw: process.env.MONGODB_PW,
  mongodb_username: process.env.MONGODB_USERNAME,
  mongodb_cluster: process.env.MONGODB_CLUSTER,
  mongodb_db: process.env.MONGODB_DB,
  session_secret: process.env.SESSION_SECRET,
  aws_access_key: process.env.AWS_ACCESS_KEY,
  aws_secret_key: process.env.AWS_SECRET_KEY,
  aws_s3_bucket_name: process.env.AWS_S3_BUCKET_NAME,
  mail_service: process.env.MAIL_SERVICE,
  mail_auth_address: process.env.MAIL_AUTH_ADDRESS,
  mail_auth_pw: process.env.MAIL_AUTH_PW,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_secret_key: process.env.GOOGLE_SECRET_KEY,
};