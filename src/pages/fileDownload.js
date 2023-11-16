import Navbar from '../components/nav'
import logoBlack from '../Media/logoBlack.svg'
import downloadImg from '../Media/downloadFileIllustration.svg'
import Footer from '../components/footer'
import word from '../Media/wordIcon.svg'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadedFiles } from '../data/local/reducers/user.reducer'
import axios from 'axios'
import { axiosInstance } from '../data/remote/clients/axios'

const FileDownload = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [apiData, setApiData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { payload } = await dispatch(uploadedFiles(id))
  //     console.log(payload.result)
  //     setApiData(payload.result)
  //   }
  //   fetchData()
  // }, [dispatch, id])
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      try {
        const response = await axiosInstance.get(
          `document_details?image=${id}`,
          config
        )
        setApiData(response.data.result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  console.log(apiData)
  const filesWithoutLast = apiData.length > 0 ? apiData.slice(0, -1) : []
  const zipFile = apiData.find((file) => file.image.endsWith('.zip'))

  const downloadZipFile = (zipFilePath) => {
    // Create an anchor element for the download
    const anchor = document.createElement('a')
    anchor.href = `http://api.transfermelon.com/assets/img/campaign_post/${zipFilePath}`
    anchor.download = 'download.zip' // Specify the desired download file name
    anchor.style.display = 'none'

    // Add the anchor to the DOM and trigger the click event
    document.body.appendChild(anchor)
    anchor.click()

    // Remove the anchor element from the DOM
    document.body.removeChild(anchor)
  }

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <Navbar bgClass={'bg-white shadow-sm'} logo={logoBlack} />

      <div className="min-h-[80vh]">
        <div className="grid grid-cols-1 gap-4 px-5 pt-0 md:grid-cols-12 md:px-10 md:pt-10">
          <div className="col-span-12 md:col-span-3">
            <div className="grid p-5 text-center bg-white border rounded-md">
              <img
                src={downloadImg}
                alt=""
                className="mb-5 justify-self-center"
              />
              <p className="text-sm">Your download is ready.</p>
              <p className="mt-2 text-xs font-semibold opacity-50">
                Files expire in 16Hrs
              </p>
            </div>
          </div>
          <div className="col-span-12 pb-16 md:col-span-9">
            <div className="p-5 bg-white border rounded-md">
              <div className="grid items-center justify-between pb-5 mb-5 space-y-6 border-b md:flex md:space-y-0">
                <div>
                  <p className="text-lg font-medium">Download files.</p>
                  <p className="text-xs opacity-50">
                    This download contains {apiData.length} files
                    <span className="font-semibold"></span>, and these files
                    will expire in 16Hrs
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => downloadZipFile(zipFile.image)}
                    className="border text-sm md:text-xs rounded bg-[#71CB90] text-white px-16 py-5 md:py-3"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filesWithoutLast.map((file, index) => {
                  const parts = file.image.split('/')
                  const fileName = parts[parts.length - 1]
                  return (
                    <div
                      key={index}
                      className="flex w-full gap-4 p-4 rounded bg-gray-50"
                    >
                      <img src={word} alt="" />
                      <div className="grid">
                        <p className="text-sm">{fileName}</p>
                        {/* //<span className="text-xs font-semibold opacity-50">3.5MB</span> */}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default FileDownload
