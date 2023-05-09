import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from '../../redux/actions/brandAction'
import { getOneSubCategory } from '../../redux/actions/subCategoryAction'
import { createProduct } from '../../redux/actions/productsAction'
import notify from '../../hook/useNotification'

const AddProductsHook = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getAllBrand())
  }, [])

  const category = useSelector(state => state.allCategory.category)
  const brand = useSelector(state => state.allBrand.brand)
  const subCategory = useSelector(state => state.allSubCategory.subCategory)
  // get create msg
  const product = useSelector(state => state.allProducts.products)

  // if(subCategory)
  // console.log(subCategory)

  // if (category)
  //   console.log(category)
  // if (brand)
  //   console.log(brand)



  // crop and theme are propertie for MultiImageInput


  // const crop = {
  //   unit: 'px',
  //   aspect: 4 / 2, // aspect width/ height
  // };
  // const theme={
  //   background: '#ffffff',
  //   outlineColor: '#f00',
  //   textColor: '#00f',
  //   buttonColor: '#0f0',
  //   modalColor: '#0ff'
  // }

  // image is for MultiImageInput
  const [images, setImages] = useState({})
  // values state
  const [prodName, setProdName] = useState('')
  const [prodDescription, setProdDescription] = useState('')
  const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم')
  const [priceAfter, setPriceAfter] = useState("السعر بعد الخصم")
  const [qty, setQty] = useState("الكمية المتاحة")
  const [catId, setCatId] = useState('')
  const [subCatId, setSubCat] = useState([])
  const [selectedSubId, setSelectedSubId] = useState([])
  const [brandId, setBrandId] = useState('')
  // show and hide color Picker
  const [showColor, setShowColor] = useState(false)
  // to store all colors
  const [colors, setColors] = useState([])
  // options for subcategory item
  const [options, setOptions] = useState([])
  // state for loading
  const [loading, setLoading] = useState(true)
  // state for loading in waiting add product
  const [load, setLoad] = useState(false)

  // when select category store id 
  const onSelectCategory = async (e) => {
    if (e.target.value !== 0)
      await dispatch(getOneSubCategory(e.target.value))
    setCatId(e.target.value)
  }
  // console.log(catId)
  // method for loading subcategory when select category
  useEffect(() => {
    if (catId !== 0) {
      if (subCategory.data) {
        setOptions(subCategory.data)
      }
      else {
        setOptions([])
      }
    }
  }, [catId])

  // when select brand store id 
  const onSelectBrand = (e) => {
    setBrandId(e.target.value)
  }
  // console.log(brandId)

  // method show hide color picker
  const onChangeColor = () => {
    setShowColor(!showColor)
  }
  // when choose color
  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex])
    setShowColor(!showColor)
  }
  // console.log(colors)

  // when clicked color remove it
  const removeColor = (color) => {
    const newColor = colors.filter((e) => { return e !== color })
    setColors(newColor)
  }
  const onSelect = (selectedList) => {

    setSelectedSubId(selectedList)

  }
  // console.log(selectedSubId)
  const onRemove = (selectedList, removedItem) => {
    // const newSubCatList = selectedList.filter((e) => { return e !== removedItem })
    // console.log(selectedSubId)
    setSelectedSubId(selectedList)
    // console.log(selectedList)
  }
  // convert base64 image to file for save image into database
  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }


  //to save data 
  const handelSubmit = async (e) => {


    e.preventDefault()
    // validation data
    if (prodName === '' || prodDescription === "" || Object.keys(images).length <= 0 || priceBefore <= 0) {
      notify('من فضلك اكمل البيانات', 'warn')
      return
    }

    // var x = Object.keys(images).length
    // console.log(x)
    // if (x !== 0) {
    //   function dataURLtoFile(dataurl, filename) {

    //     var arr = dataurl?.split(','),
    //       mime = arr[0].match(/:(.*?);/)[1],
    //       bstr = atob(arr[1]),
    //       n = bstr.length,
    //       u8arr = new Uint8Array(n);

    //     while (n--) {
    //       u8arr[n] = bstr.charCodeAt(n);
    //     }

    //     return new File([u8arr], filename, { type: mime });
    //   }

    //   const imgCover = dataURLtoFile(images[0], Math.random() + ".png")
    //   const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
    //     (item, index) => {
    //       return dataURLtoFile(images[index], Math.random() + ".png")
    //     }
    //   )
    // const formData = new FormData()

    // formData.append('imageCover', imgCover)
    // itemImages.map((item) => formData.append('images', item))

    // setLoading(true)
    // setLoad(true)
    // await dispatch(createProduct(formData))
    // setLoading(false)
    // setLoad(false)
    // }




    // convert base 64 image to file
    const imgCover = dataURLtoFile(images[0], Math.random() + ".png")

    // convert array of images base 64 to file👇🏻

    // Array(Object.keys(images).length === 6
    // Array(Object.keys(images).length).keys() === (0,1,2,3,4,5)
    // Array.from(Array(Object.keys(images).length).keys()) === [0,1,2,3,4,5]

    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (item, index) => {
        return dataURLtoFile(images[index], Math.random() + ".png")
      }
    )
    // _________________________________________________________

    const formData = new FormData()
    formData.append('title', prodName)
    formData.append('description', prodDescription)
    formData.append('quantity', qty)
    formData.append('price', priceBefore)
    formData.append('priceAfterDiscount', priceAfter)
    formData.append('imageCover', imgCover)
    formData.append('category', catId)
    formData.append('brand', brandId)
    
    // these are an element of array
    itemImages.map((item) => formData.append('images', item))
    colors.map((color) => formData.append("colors", color))
    selectedSubId.map((item) => formData.append("subcategories", item._id))

    setLoading(true)
    setLoad(true)
    await dispatch(createProduct(formData))
    setLoading(false)
    setLoad(false)

  }

  useEffect(() => {
    if (loading === false) {
      // setCatID(0)
      setColors([])
      setImages({})
      setProdName('')
      setProdDescription('')
      setPriceBefore('السعر قبل الخصم')
      setPriceAfter('السعر بعد الخصم')
      setQty('الكمية المتاحة')
      setBrandId(0)
      setSelectedSubId([])
      setTimeout(() => setLoading(true), 1500)
      if (product) {
        if (product.status === 201) {
          notify("تم الاضافة بنجاح", "success")
        } else {
          notify("هناك مشكله", "error")
        }
      }
    }

  }, [loading])

  return [load, images, setImages, prodName, setProdName, prodDescription, setProdDescription, priceBefore, setPriceBefore, priceAfter, setPriceAfter, qty, setQty, onSelectCategory, category, options, onSelect, onRemove, onSelectBrand, brand, colors, removeColor, onChangeColor, showColor, handelSubmit, handleChangeComplete, loading]
}


export default AddProductsHook