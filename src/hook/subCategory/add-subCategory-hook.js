import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import notify from '../../hook/useNotification'
import { createSubCategory } from '../../redux/actions/subCategoryAction'

const AddSubCategoryHook = () => {

  const dispatch = useDispatch()

  const [id, setId] = useState('0')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  const category = useSelector(state => state.allCategory.category)
  const subcategory = useSelector(state => state.allSubCategory.subCategory)
  // console.log(subCategory)

  useEffect(() => {
    if (!navigator.onLine) {
      notify("هناك مشكلة بالاتصال بالانترنت", "error");
      return
    }
    dispatch(getAllCategory())
  }, [])

  // onChange dropdown (value) in menu
  const handelChangeCategory = (e) => {
    console.log(e.target.value)
    setId(e.target.value)
  }
  // onChange name (main category)
  const handelChangeName = (e) => {
    setName(e.target.value)
  }
  // submit (save data)
  const handelSubmit = async (e) => {
    // check internet
    if (navigator.onLine) {
      console.log("هناك اتصال بالانترنت");
    } else {
      console.log("هناك مشكلة بالاتصال بالانترنت");
    }
    e.preventDefault()
    if (id === '0') {
      notify('المرجو اختيار تصنيف رئيسي', 'warn')
      return
    }
    if (name === '') {
      notify(' المرجو ادخال التصنيف الفرعي', 'warn')
      return
    }
    setLoading(true)

    await dispatch(createSubCategory({
      // name et category font reference a l'objet dans backend (postman)
      name, // egale à name : name
      category: id
    }))
    setLoading(false)
  }

  useEffect(() => {
    if (loading === false) {
      setName('')
      setId('0')
      if (subcategory)
        console.log(subcategory)

      if (subcategory.status === 201) {
        notify("تمت الاضافة بنجاح", "success")
      }
      else if (subcategory === "Error Error: Request failed with status code 400") {
        notify("هذا الاسم مكرر من فضلك اختر اسم اخر", "warn")
      }
      else {
        notify("هناك مشكله فى عملية الاضافة", "warn")
      }


      setLoading(true)
    }
  }, [loading])

  return [id, name, category, handelChangeCategory, handelChangeName, handelSubmit]

}

export default AddSubCategoryHook