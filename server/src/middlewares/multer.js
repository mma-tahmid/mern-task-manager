const multer = require('multer');

const storage = multer.memoryStorage();

exports.SingleUpload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 } // 1MB limit 
    // Mb convert to bytes 
    //1MB = 1024×1024= 1,048, 576Bytes
}).single("image_or_pdf_file"); // Ensure your input name is "image" in frontend 
