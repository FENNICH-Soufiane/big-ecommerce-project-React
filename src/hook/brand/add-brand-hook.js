import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import avatar from '../../images/avatar.png'
import notify from '../../hook/useNotification'

const AddBrandHook = () => {

  const [img, setImg] = useState(avatar)
  const [name, setName] = useState('')
  const [selecteFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPress, setIsPress] = useState(false)

  const dispatch = useDispatch()
  const res = useSelector(state => state.allBrand.brand)


 
  // when image change save it
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0])
      // code for show img selected
      setImg(URL.createObjectURL(event.target.files[0]))
    setSelectedFile(event.target.files[0])
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  // save data in database
  const handelSubmit = async (event) => {
    event.preventDefault()

    if (name === "" || selecteFile === null) {
      notify("من فضلك ادخل البيانات", "warn")
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', selecteFile)

    setLoading(true)
    setIsPress(true)
    await dispatch(createBrand(formData)) // loading est true depuis l'action
    setLoading(false)

  }

  useEffect(() => {
    if (!loading) {
      setImg(avatar)
      setName('')
      setSelectedFile(null)
      setLoading(true)
      setTimeout(() => {
        setIsPress(false)
      }, 1500)
      if (res.status === 201) {
        notify("تمت عملية الاضافة بنجاح", "success")
      }
      else {
        notify("هناك مشكل في عملية الاضافة", "error")
      }
    }
  }, [loading])

  return [img, name, loading, isPress,onChangeName, handelSubmit, onImageChange]

}

export default AddBrandHook