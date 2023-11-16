import containerImg from '../Media/container.svg'
import remove from '../Media/delete.svg'
import React, { useState, useRef } from 'react'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFiles } from '../data/local/reducers/user.reducer'
import axios from 'axios'
import { axiosInstance } from '../data/remote/clients/axios'

const AddFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showFileSelector, setShowFileSelector] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': 987654,
    },
  }

  // handle file selection
  const handleFileSelect = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files)
    const updatedFiles = files.map((file, index) => {
      // Rename each file as "image_{index + 1}"
      file.displayName = `image_${index + 1}`
      return file
    })
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles])
  }

  // remove a selected file
  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }

  // const handleGetLink = async() => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append('image_count', selectedFiles.length);
  //   selectedFiles.forEach((file, index) => {
  //     formData.append(`image_${index + 1}`, file);
  //   });
  //   const { payload } = await dispatch(addFiles(formData));
  //   if (payload.status_code === "0") {
  //     navigate("/file_ready");
  //   }
  // };
  const handleGetLink = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('image_count', selectedFiles.length)
    selectedFiles.forEach((file, index) => {
      formData.append(`image_${index + 1}`, file)
    })

    //   try {
    //     const response = await axiosInstance.post('identity_uploaded', formData)
    //     console.log(response)
    //     const apiUrl = response.config.url
    //     console.log('API URL:', apiUrl)
    //     if (response.data['status_code'] === '0') {
    //       navigate('/file_ready')
    //       sessionStorage.setItem('addFilesProfile', JSON.stringify(response.data))
    //       sessionStorage.setItem('token', JSON.stringify(response.data.token))
    //     }
    //   } catch (error) {
    //     console.error('Error making POST request:', error)
    //   }
    console.log(formData)
    axiosInstance
      .post(
        'identity_upload',
        formData
        // config
      )
      .then((res) => {
        console.log(res)
        if (res.data['status_code'] === '0') {
          navigate('/file_ready')
          sessionStorage.setItem('addFilesProfile', JSON.stringify(res.data))
          sessionStorage.setItem('token', JSON.stringify(res.data.token))
        }
      })
  }

  return (
    <div className="h-full overflow-y-scroll text-sm bg-white rounded-md">
      {loading ? (
        <div className="py-4 text-center">
          <div className="sticky top-0 items-end px-5 pt-8 pb-4 bg-white shadow-sm">
            <p className="text-semibold">Add files.</p>
            <p className="text-xs opacity-60">
              you can only send up to 2GB at a time
            </p>
          </div>
          <div className="py-4 text-center">
            <CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <div>
          <div className="sticky top-0 items-end px-5 pt-8 pb-4 bg-white shadow-sm">
            <p className="text-semibold">Add files.</p>
            <p className="text-xs opacity-60">
              you can only send up to 2GB at a time
            </p>
          </div>
          {!showFileSelector ? (
            <button
              onClick={() => setShowFileSelector(true)}
              className="w-full"
            >
              <div className="grid px-5 py-20 text-xs text-center">
                <img
                  src={containerImg}
                  alt=""
                  className="mb-3 justify-self-center"
                />
                <p className="opacity-50">You haven't uploaded any files yet</p>
                <p className="opacity-50">Click to begin</p>
              </div>
            </button>
          ) : (
            <div>
              {selectedFiles.length > 0 && (
                <div className="grid px-5 py-8 text-sm">
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="mb-5 text-xs">
                        <div className="grid grid-cols-6">
                          <div className="col-span-5 truncate">{file.name}</div>
                          <button
                            className="justify-self-end"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <img src={remove} alt="" />
                          </button>
                        </div>
                        <div className="text-gray-400">
                          <p className="font-medium">
                            {(file.size / (1024 * 1024)).toFixed(2)} mb
                          </p>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              )}

              <div className="px-5">
                {selectedFiles.length > 0 ? (
                  <button
                    onClick={handleFileSelect}
                    className="border w-full py-4 mb-8 text-xs rounded border-[#71CB90] text-[#71CB90] flex justify-center items-center gap-4 hover:bg-[#71CB9024]"
                  >
                    <span>add more files</span>
                  </button>
                ) : (
                  <div className="py-24">
                    <button
                      onClick={handleFileSelect}
                      className="border w-full py-4 text-xs rounded border-[#71CB90] text-[#71CB90] hover-bg-[#71CB9024]"
                    >
                      Select files
                    </button>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                multiple
                onChange={handleFileInputChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <div
                className={
                  selectedFiles.length > 0
                    ? 'bg-[#F4FBF7] p-5 border-t sticky bottom-0'
                    : 'hidden'
                }
              >
                <button
                  onClick={handleGetLink}
                  className="bg-[#71CB90] text-white w-full py-4 text-xs font-semibold rounded"
                >
                  Get a link
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddFiles
