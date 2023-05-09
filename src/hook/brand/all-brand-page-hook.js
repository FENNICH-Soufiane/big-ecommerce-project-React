import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// getAllBrandPage for pagination
import { getAllBrand, getAllBrandPage } from '../../redux/actions/brandAction'

const AllBrandPageHook = () => {

  const dispatch = useDispatch();
  // when first load
  useEffect(() => {
    // enable redux (Action)
    dispatch(getAllBrand(6))
  }, [])

  // get data from redux (reducer)
  const brand = useSelector(state => state.allBrand.brand)
  const loading = useSelector(state => state.allBrand.loading)

  // get page count
  let pageCount = 0
  if (brand.paginationResult) {
    pageCount = brand.paginationResult.numberOfPages
  }

  // when press pagination
  const getPage = (page) => {
    dispatch(getAllBrandPage(page))
    console.log(page)
  }

  return [brand, loading, pageCount, getPage]
}

export default AllBrandPageHook