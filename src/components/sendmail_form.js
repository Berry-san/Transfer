import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendFiles } from '../data/local/reducers/user.reducer'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { emailInstance } from '../data/remote/clients/axios'

const SendAsMail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [subject, setSubject] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  // const addFileProfile = useSelector((state) => state.user.addFilesProfile)
  const addFileProfile = sessionStorage.getItem('addFilesProfile')
  const storedData = JSON.parse(addFileProfile)
  const zippedFile = storedData.zip_file

  const handleSubmit = async (e) => {
    e.preventDefault()

    let userCredential = {
      email: recipientEmail,
      subject: subject,
      body: zippedFile,
    }

    // const { payload } = await dispatch(sendFiles(userCredential));

    emailInstance.post('email_message', userCredential)

    toast.success('Mail Send Successfully', {
      position: toast.POSITION.TOP_CENTER,
    })
    //navigate("/dashboard");
  }
  console.log(zippedFile)

  return (
    <div className="bg-white rounded-md">
      <div className="sticky top-0 flex items-center justify-between p-5 bg-white shadow-sm rounded-t-md">
        <p>Send as email</p>
        <Link to={'/'} className="text-xs text-[#71CB90]">
          Send another file
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {' '}
        {/* Add a form element with an onSubmit handler */}
        <div className="grid gap-5 p-5">
          <div className="grid gap-1 text-xs">
            <span>Title</span>
            <input
              type="text"
              className="border bg-[#00000002] rounded-sm p-4 focus:border-[#71CB9072] focus:outline-0"
              placeholder="Give your mail a subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)} // Update the state
            />
          </div>
          <div className="grid gap-1 text-xs">
            <span>Email address</span>
            <input
              type="text"
              className="border bg-[#00000002] rounded-sm p-4 focus:border-[#71CB9072] focus:outline-0"
              placeholder="Receiver's email address"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)} // Update the state
            />
          </div>
          <button
            className="border px-8 py-4 text-xs rounded text-white bg-[#71cb90]"
            type="submit"
          >
            Send email.
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendAsMail
