import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FcCamera } from "react-icons/fc";
import getCroppedImg from "./cropImage";
import { updateProfile } from "../services/profileService";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/profileService";

const ProfilePictureCropper = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const Email=localStorage.getItem("userEmail")
  const handleSubmit = async () => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const address = document.getElementById("address").value.trim();
    const zipCode = document.getElementById("zipCode").value.trim();
  
    // Check if any required field is empty
    if (!firstName || !lastName || !phoneNumber || !country || !city || !address || !zipCode) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
  
    // Proceed with form submission
    console.log("Form submitted successfully!", { firstName, lastName, phoneNumber, country, city, address, zipCode });
    try {
        const res = await updateProfile(formData);
        localStorage.setItem("isNewUser", "false");
        console.log(res);
      if(res){
        navigate("/");
      }
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await getProfile(localStorage.getItem("userEmail"));
      if (res) {
        setFormData(res.data);
      } else {
        console.warn("Profile data is empty or undefined.");
        setFormData({}); // Fallback to empty object
      }
    } catch (error) {
      console.error(error?.response?.data?.msg ?? error.message ?? "Failed to fetch profile.");
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  

  const [dogImg, setDogImg] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isImageCropped, setIsImageCropped] = useState(false);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setIsImageCropped(true);
    } catch (e) {
      console.error(e);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setDogImg(reader.result);
      setIsImageUploaded(true);
      setIsImageCropped(false);
    });
    reader.readAsDataURL(file);
  };

  const onClose = () => {
    setCroppedImage(null);
    setIsImageUploaded(false);
    setIsImageCropped(false);
  };

  const fileInputRef = React.useRef();
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mt-2 animate-fadeIn">
      {isImageUploaded && !isImageCropped && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-lg animate-slideIn flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-red-500 focus:outline-none"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="w-full h-64 relative mb-5 rounded-lg overflow-hidden flex justify-center items-center">
              <Cropper
                image={dogImg}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1}
                minWidth={50}
                minHeight={50}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex flex-col items-center w-full py-5">
              <div className="w-4/5 mb-4">
                <Typography variant="overline" className="text-sm mb-2 text-gray-700">
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <div className="w-4/5 mb-4">
                <Typography variant="overline" className="text-sm mb-2 text-gray-700">
                  Rotation
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                className="mt-5 w-4/5 py-2 text-lg rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Set Profile Picture
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-2xl">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />

        <div className="flex justify-center items-center">
          <div>
          {!isImageCropped && (
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex justify-center items-center">
                <FcCamera
                  className="text-purple-700 cursor-pointer"
                  onClick={handleClick}
                  size={80} // Set size as large as the circle
                />
              </div>
            )}
            {isImageCropped && (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex justify-center items-center">
                <img
                  src={croppedImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <FcCamera
              className="relative bottom-6  cursor-pointer"
              onClick={handleClick}
              size={25}
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex-1 mr-2">
            <label className="block mb-1 font-bold text-gray-700">First Name</label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="First Name"
              id="firstName"
              value={formData && formData.firstName ? formData.firstName : ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-bold text-gray-700">Last Name</label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Last Name"
              value={formData && formData.lastName ? formData.lastName : ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              id="lastName"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700">Email Address</label>
          <input
            className="w-full p-2 border rounded-md"
            type="email"
            value={Email}
            readOnly
            
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700">Phone Number</label>
          <input
            className="w-full p-2 border rounded-md"
            type="tel"
            placeholder="Phone Number"
            id="phoneNumber"
            value={formData && formData.phoneNumber ? formData.phoneNumber : ""}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex-1 mr-2">
            <label className="block mb-1 font-bold text-gray-700">Country</label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Country"
              id="country"
              value={formData && formData.country ? formData.country : ""}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-bold text-gray-700">City</label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="City"
              id="city"
              value={formData && formData.city ? formData.city : ""}

              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex-1 mr-2">
            <label className="block mb-1 font-bold text-gray-700">Address</label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Address"
              id="address"
              value={formData && formData.address ? formData.address : ""}

              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-bold text-gray-700">Zip Code</label>
            <input
              id="zipCode"
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Zip code"
              value={formData && formData.zipCode ? formData.zipCode : ""}

              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureCropper;
