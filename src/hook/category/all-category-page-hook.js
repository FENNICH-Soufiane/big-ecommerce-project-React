import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory, getAllCategoryPage } from '../../redux/actions/categoryAction'

const AllCategoryPageHook = () => {

  const dispatch = useDispatch();
  // when first load
  useEffect(() => {
    // enable redux (Action)
    dispatch(getAllCategory(6))
  }, [])

  // get data from redux (reducer)
  const category = useSelector(state => state.allCategory.category)
  const loading = useSelector(state => state.allCategory.loading)

  // get page count
  let pageCount = 0
  if (category.paginationResult) {
    pageCount = category.paginationResult.numberOfPages
  }

  // when press pagination
  const getPage = async (page) => {
    await dispatch(getAllCategoryPage(page))
    console.log(page)
  }

  return [category, loading, pageCount, getPage]
}

export default AllCategoryPageHook