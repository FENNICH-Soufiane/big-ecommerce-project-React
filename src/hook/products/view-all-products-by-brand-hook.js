import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProductsByBrand } from "../../redux/actions/productsAction"


const ViewAllProductsByBrandHook = (brandID) => {
  let limit = 5
  const dispatch = useDispatch()

  const getBrand = async () => {
    await dispatch(getAllProductsByBrand('', limit, brandID))
  }
  useEffect(() => {
    getBrand()
  }, [])

  // when click pagination
  const onPress = async (page) => {
    await dispatch(getAllProductsByBrand(page, limit, brandID))
  }
  const allProductsByBrand = useSelector(state => state.allProducts.allProductByBrand)
  let items = [], pagination = []
  try {
    if(allProductsByBrand.data) items = allProductsByBrand.data
    else items = []
  }catch(e) {}

  try {
    if (allProductsByBrand.paginationResult) {
      pagination = allProductsByBrand.paginationResult.numberOfPages
    }
  } catch (e) {

  }
  return [items, pagination, onPress]
}

export default ViewAllProductsByBrandHook