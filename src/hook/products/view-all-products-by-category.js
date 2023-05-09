import { useDispatch, useSelector } from "react-redux"
import { getAllProductsByCategory } from "../../redux/actions/productsAction"
import { useEffect } from "react"


const ViewAllProductsByCategory = (catID) => {
  let limit = 8
  const dispatch = useDispatch()

  const getProductByCat = async () => {
    await dispatch(getAllProductsByCategory('', limit, catID))
  }
  useEffect(() => {
    getProductByCat()
  }, [])



  const allProductsByCat = useSelector(state => state.allProducts.allProductByCat)
  console.log(allProductsByCat)
  let items =0; let pagination = 0
  try {
    if (allProductsByCat.data) {
      items = allProductsByCat.data
    } else {
      items = []
    }
  } catch (e) { }

  try {
    if (allProductsByCat) {
      if (allProductsByCat.paginationResult) {
        pagination = allProductsByCat.paginationResult.numberOfPages
        console.log(pagination)
      } else {
        pagination = []
      }
    }
  } catch (e) { }

  //   When click pagination
  const onPress = async (page) => {
    await dispatch(getAllProductsByCategory(page, limit, catID))
  }
  return [items, pagination, onPress]
}

export default ViewAllProductsByCategory