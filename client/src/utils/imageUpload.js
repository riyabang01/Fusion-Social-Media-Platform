export const checkImage = (file) => {
  if (!file) return "File does not exist.";
  
  
  if (file.size > 1024 * 1024 * 5) {
    return "File size must be less than 5 MB.";
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
  if (!validTypes.includes(file.type)) {
    return "Supported formats are JPEG, PNG, WebP, and MP4.";
  }

  return "";
};

export const imageUpload = async (images) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  

  const uploadUrl = "https://api.cloudinary.com/v1_1/" + cloudName + "/upload";

  const uploadPromises = images.map(async (item) => {
    const formData = new FormData();
    const fileToUpload = item.camera ? item.camera : (item.path || item.buffer || item);
    
    formData.append("file", fileToUpload);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || "Upload failed with status code " + res.status);
    }

    const data = await res.json();
    return {
      public_id: data.public_id,
      url: data.secure_url,
    };
  });

  return Promise.all(uploadPromises);
};
