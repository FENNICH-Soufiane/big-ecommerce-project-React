import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createCategory } from '../../redux/actions/categoryAction'
import avatar from '../../images/avatar.png'
import notify from '../../hook/useNotification'

const AddCategoryHook = () => {
  const [img, setImg] = useState(avatar)
  const [name, setName] = useState('')
  const [selecteFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPress, setIsPress] = useState(false)

  const dispatch = useDispatch()
  const res = useSelector(state => state.allCategory.category)


  // get loading state from redux (reducer)
  // on va remplacer le loading du backend avec un loading personnaliser🤏🤏🏻🤏🏿🤏🏽
  // const loading = useSelector(state => state.allCategory.loading)


  // when image change save it
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0])
      // code for show img selected
      setImg(URL.createObjectURL(event.target.files[0]))
    setSelectedFile(event.target.files[0])
  }

  const onChangeName = (e) => {
    e.persist()
    setName(e.target.value)
  }

  // save data in database
  const handelSubmit = async (event) => {
    event.preventDefault()

    if (name === "" || selecteFile === null) {
      console.log()
      notify("من فضلك ادخل البيانات", "warn")
      return
    }

    // add data to FormData (build in react method)
    const formData = new FormData()
    // 'name' est indiquer dans le backend dans le body
    // name est l'element a envoyer 
    formData.append('name', name)
    formData.append('image', selecteFile)

    setLoading(true)
    setIsPress(true)
    await dispatch(createCategory(formData)) // loading est true depuis l'action
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

export default AddCategoryHook