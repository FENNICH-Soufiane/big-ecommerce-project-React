import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from '../../redux/actions/brandAction'
import { getOneSubCategory } from '../../redux/actions/subCategoryAction'
import { getOneProducts, updateProducts } from '../../redux/actions/productsAction'
import notify from '../../hook/useNotification'

const AdminEditProductsHook = (id) => {

  const dispatch = useDispatch()
  useEffect(() => {
    const run = async () => {
      await dispatch(getOneProducts(id))
      await dispatch(getAllCategory())
      await dispatch(getAllBrand())
    }
    run()
  }, [])

  // get one product details
  const item = useSelector(state => state.allProducts.oneProduct)
  const category = useSelector(state => state.allCategory.category)
  const brand = useSelector(state => state.allBrand.brand)
  const subCategory = useSelector(state => state.allSubCategory.subCategory)

  // return all details of product
  // console.log()

  // create message
  const product = useSelector(state => state.allProducts.updateProducts)

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
  const [images, setImages] = useState([])
  // values state
  const [prodName, setProdName] = useState('')
  const [prodDescription, setProdDescription] = useState('')
  const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم')
  const [priceAfter, setPriceAfter] = useState("السعر بعد الخصم")
  const [qty, setQty] = useState("الكمية المتاحة")
  const [catId, setCatId] = useState({})
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
  // this is load showed in page when request is run
  const [load, setLoad] = useState(false)

  // show all data in all input when want to modify

  // let name = ''
  // if (item) {
  //   if (item.data) {
  //     if (item.data.category) {
  //       name = item.data.category.name
  //     }
  //   }
  // }

  useEffect(() => {
    if (item.data) {
      setProdName(item.data.title)
      setProdDescription(item.data.description)
      setPriceBefore(item.data.price)
      setQty(item.data.quantity)
      setBrandId(item.data.brand)
      setCatId(item.data.category._id)
      setColors(item.data.colors)
      setImages(item.data.images)
    }
  }, [item])



  // console.log(brandId)
  console.log(catId)
  console.log(item)

  // when select category store id 
  const onSelectCategory = async (e) => {
    // if (e.target.value !== 0)
    //   await dispatch(getOneSubCategory(e.target.value))
    setCatId(e.target.value)
  }
  // console.log(catId)
  // method for loading subcategory when select category
  useEffect(() => {
    if (catId !== 0) {
      const run = async () => {
        await dispatch(getOneSubCategory(catId))
      }
      run()
    }
  }, [catId])

  useEffect(() => {
    if (subCategory) {
      setOptions(subCategory.data)
    }
    else {
      setOptions([])
    }
  }, [subCategory])


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

  //convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

  //to save modified data 
  const handelSubmit = async (e) => {

    e.preventDefault()
    // validation data
    if (prodName === '' || prodDescription === "" || images.length < 0 || priceBefore <= 0) {
      notify('من فضلك اكمل البيانات', 'warn')
      return
    }

    console.log(images[0])

    let imgCover;
    // if url :convert to file
    if (images[0].length <= 1000) {
      convertURLtoFile(images[0]).then(val => imgCover = val)
    }
    // if base 64:convert to file
    else {
      imgCover = dataURLtoFile(images[0], Math.random() + ".png")
    }

    // convert array of images base 64 to file👇🏻

    // Array(Object.keys(images).length === 6
    // Array(Object.keys(images).length).keys() === (0,1,2,3,4,5)
    // Array.from(Array(Object.keys(images).length).keys()) === [0,1,2,3,4,5]
    let itemImages = []

    Array.from(Array(Object.keys(images).length).keys()).map(
      (item, index) => {
        // if url :convert to file
        if (images[index].length <= 1000) {
          convertURLtoFile(images[index]).then(val => itemImages.push(val))
        }
        // if base 64 :convert to file
        else {
          itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"))
        }
      }
    )
    // _________________________________________________________
    const formData = new FormData()
    formData.append('title', prodName)
    formData.append('description', prodDescription)
    formData.append('quantity', qty)
    formData.append('price', priceBefore)
    formData.append('imageCover', imgCover)
    formData.append('category', catId)
    formData.append('brand', brandId)

    // these are an element of array
    itemImages.map((item) => formData.append('images', item))
    colors.map((color) => formData.append("colors", color))
    selectedSubId.map((item) => formData.append("subcategories", item._id))

    setLoading(true)
    setLoad(true)
    await dispatch(updateProducts(id, formData))
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
        if (product.status === 200) {
          notify("تم الاضافة بنجاح", "success")
        } else {
          notify("هناك مشكله", "error")
        }
      }
    }

  }, [loading])

  return [load, brandId, catId, images, setImages, prodName, setProdName, prodDescription, setProdDescription, priceBefore, setPriceBefore, priceAfter, setPriceAfter, qty, setQty, onSelectCategory, category, options, onSelect, onRemove, onSelectBrand, brand, colors, removeColor, onChangeColor, showColor, handelSubmit, handleChangeComplete, item]

}

export default AdminEditProductsHook