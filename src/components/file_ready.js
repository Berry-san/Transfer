import pic from '../Media/file_ready.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const FileReady = () => {
  // const addFileProfile = useSelector((state) => state.user.addFilesProfile)
  const addFileProfile = sessionStorage.getItem('addFilesProfile')
  const storedData = JSON.parse(addFileProfile)
  const zippedFile = storedData.zip_file
  const [zipCopy, setZipCopy] = useState(false)
  const parts = zippedFile.split('/') // Split the URL by '/'
  const fileIdWithExtension = parts[parts.length - 1] // Get the last part
  const fileId = fileIdWithExtension.split('.')[0]

  const handleCopyZipped = (text) => {
    setZipCopy(true)
    toast.success('Link copied!', {
      position: toast.POSITION.TOP_CENTER,
    })
  }

  return (
    <div className="px-5 pt-5 pb-10 bg-white rounded-md">
      <div className="flex justify-center">
        <img src={pic} alt="" />
      </div>
      <p className="text-xs font-medium text-center">Your file is ready</p>
      <input
        type="text"
        name=""
        id=""
        value={`http://api.transfermelon.com/assets/img/user_account/${fileId}`}
        disabled
        className="p-4 rounded-sm text-sm md:text-xs w-full border border-[#c4c4c432] bg-[#c4c4c416] truncatem my-5"
      />
      <div className="flex justify-center">
        <button className="border px-8 py-4 text-xs rounded text-white bg-[#71cb90]">
          <CopyToClipboard
            text={`http://api.transfermelon.com/assets/img/user_account/${fileId}`}
            onCopy={handleCopyZipped}
          >
            <span className=" cursor-pointer text-[#127ec8]" disabled={zipCopy}>
              {zipCopy ? 'Link Copied!' : 'Copy link'}
            </span>
          </CopyToClipboard>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-6 text-xs">
        <Link to={'/send_file'} className="text-end text-[#71cb90] underline">
          Send as email
        </Link>
        <Link to={'/view_content'} className="underline opacity-75">
          View content
        </Link>
      </div>
    </div>
  )
}

export default FileReady
