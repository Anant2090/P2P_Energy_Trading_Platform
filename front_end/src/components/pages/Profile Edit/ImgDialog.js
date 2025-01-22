import React from 'react'

const ImgDialog = ({ img, onClose }) => {
  if (!img) return null
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <img src={img} alt="Cropped" style={{ maxWidth: '100%' }} />
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default ImgDialog
