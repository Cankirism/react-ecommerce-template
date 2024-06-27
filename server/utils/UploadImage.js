const cloudinary = require('cloudinary').v2;

module.exports.UploadImage =async (fileStream,fileName)=>{

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    
    });
    
    // Upload an image
    const uploadResult = await cloudinary
                                .uploader
                                .upload(fileStream,
                                        {public_id:fileName},function (res){
                                    console.log("res is ",res);
                                })
                                .catch((error)=>
                                    {console.log(error)});
    
   // console.log("upload result is ",uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(fileName, {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
   // console.log("optimized url is ",optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const url = cloudinary.url(fileName, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
   // console.log("image url is ",optimizeUrl);  
    return optimizeUrl;  
};


