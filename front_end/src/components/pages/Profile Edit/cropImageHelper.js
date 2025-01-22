export default async function getCroppedImg(imageSrc, croppedAreaPixels) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
  
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
  
    return new Promise((resolve) => {
      canvas.toDataURL("image/jpeg", (dataUrl) => {
        resolve(dataUrl);
      });
    });
  }
  
  function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  }
  