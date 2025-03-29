const getCroppedImg = (imageSrc, crop, rotation = 0) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = imageSrc
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
  
        // Set canvas size to crop size
        canvas.width = crop.width
        canvas.height = crop.height
  
        // Draw the image
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        )
  
        resolve(canvas.toDataURL('image/jpeg'))
      }
      image.onerror = (error) => reject(error)
    })
  }
  
  export default getCroppedImg
  