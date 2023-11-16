import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUpload } from '../../data/local/reducers/user.reducer'
import { axiosInstance } from '../../data/remote/clients/axios'

const Advert2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const alternatingPosition = currentIndex % 2 === 0
  const dispatch = useDispatch()
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axiosInstance
      .get('document_list')
      .then((res) => {
        setApiData(res.data.result)
        setIsLoading(false)
        if (apiData.length > 0) {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % apiData.length)
          }, 5000)

          return () => clearInterval(interval)
        }
      })
      .catch((err) => console.log(err))
  }, [apiData.length])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { payload } = await dispatch(getUpload())
  //     console.log(payload)
  //     setApiData(payload.result)
  //     setIsLoading(false) // Set loading to false once data is fetched
  //   }
  //   console.log(apiData)
  //   if (apiData.length > 0) {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % apiData.length)
  //     }, 5000)

  //     return () => clearInterval(interval)
  //   }
  //   fetchData()
  // }, [apiData, dispatch])

  const item = apiData.length > 0 ? apiData[currentIndex] : null
  // console.log(item)

  return (
    <div className="grid gap-8 text-white">
      {isLoading ? (
        // Render a loader here (e.g., a spinning animation or a loading message)
        <p>Loading...</p>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
            alternatingPosition ? 'md:items-start' : 'md:items-end'
          }`}
        >
          <div className="md:col-span-1">
            <p className="inknut-font text-2xl leading-[30px]">
              {item.headers ?? ''}
            </p>
            <p className="mt-3 text-sm leading-4">{item.BODY}</p>
          </div>
          {!alternatingPosition && (
            <Link
              to={item.button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-1"
            >
              <img
                src={`http://api.transfermelon.com/assets/img/campaign_post/${item.image}`}
                alt=""
                className="h-[200px] w-full rounded-md object-cover"
              />
            </Link>
          )}
          {alternatingPosition && (
            <Link
              to={item.button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-1"
            >
              <img
                src={`http://api.transfermelon.com/assets/img/campaign_post/${item.image}`}
                alt=""
                className="h-[200px] w-full rounded-md object-cover"
              />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Advert2
