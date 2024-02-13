const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

async function uploadMedia(file) {
  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(bytes);
  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });
  return uploadImage;
}
export { cloudinary, uploadMedia };
