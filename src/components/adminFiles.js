import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fileUpload, sendFiles } from "../data/local/reducers/user.reducer";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminFiles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file
  const addFileProfile = useSelector((state) => state.user.addFilesProfile);
  const zippedFile = addFileProfile.zip_file;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("header", header);
    formData.append("body", body);
    formData.append("botton_name", buttonName);
    formData.append("botton_url", buttonUrl);
    formData.append("image", imageFile);
  
    const { payload } = await dispatch(fileUpload(formData));
  
    if (payload.status_code === "0") {
      toast.success("File updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // navigate("/dashboard");
  };
  

  return (
    <div className="bg-white rounded-md">
      <div className="p-5 sticky top-0 bg-white shadow-sm rounded-t-md flex justify-between items-center">
        <p>Update background files</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-5 grid gap-5">
          {/* Header */}
          <div className="text-xs grid gap-1">
            <span>Header</span>
            <input
              type="text"
              className="border bg-[#00000002] rounded-sm p-4 focus:border-[#71CB9072] focus:outline-0"
              placeholder="Enter your Header Information"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>
          {/* Body */}
          <div className="text-xs grid gap-1">
            <span>Body</span>
            <input
              type="text"
              className="border bg-[#00000002] rounded-sm p-4 focus:border-[#71CB9072] focus:outline-0"
              placeholder="Enter The Body Information"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          {/* Button Name */}
          <div className="text-xs grid gap-1">
            <span>Button Name</span>
            <input
              type="text"
              className="border bg-[#00000002] rounded-sm p-4 focus:border-[#71CB9072] focus:outline-0"
              placeholder="Enter Button Name"
              value={buttonName}
              onChange={(e) => setButtonName(e.target.value)}
            />
          </div>
          {/* Button URL */}
          <div className="text-xs grid gap-1">
            <span>Button URL</span>
            <input
              type="text"
              className="border bg-[#00000002] rounded-sm p-4 focus:border-[#71CB9072] focus:outline-0"
              placeholder="Enter Button Link URL"
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value)}
            />
          </div>
          {/* Upload image */}
          <div className="text-xs grid gap-1">
            <span>Upload Image</span>
            <input
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>
          <button
            className="border px-8 py-4 text-xs rounded text-white bg-[#71cb90]"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFiles;
