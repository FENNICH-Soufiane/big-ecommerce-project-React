import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'

const HomeCategoryHook = () => {
    const dispatch = useDispatch();

    // dispatch (function action())
    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    // @desc allCategory est le nom du reducer dans rootReducer
    // @desc =>state provient de const categoryReducer = (state = initial,...)
    // @desc .category provient de reducer de
    //   return {
    //     ...state,
    //     category: action.payload,
    //     loading: false
    //   }
    const category = useSelector(state => state.allCategory.category)
    const loading = useSelector(state => state.allCategory.loading)
    // console.log(category)
    // console.log(loading)

    const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#d6d600", "#e47269", "#3d6e6a"]

    return [category, loading, colors]
}

export default HomeCategoryHook