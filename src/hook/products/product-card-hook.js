import { useEffect, useState } from 'react'
import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";
import { useDispatch, useSelector } from 'react-redux'
import { addProductToWishlist, removeProductToWishlist } from '../../redux/actions/wishListAction'
import notify from '../../hook/useNotification'

const ProductCardHook = (item, favProd) => {
    const dispatch = useDispatch()

    const [favImg, setFavImg] = useState(favoff)
    let Fav = favProd.some(fitem => fitem === item._id)
    const [isFav, setIsFav] = useState(Fav)

    const [loadingAdd, setLoadingAdd] = useState(true)
    const [loadingRemove, setLoadingRemove] = useState(true)

    // cette useEffect pour faire face au retart de chargement 
    // des données de favProd provenent de CardProductsContainer qui sont les produits de la liste de souhaits
    useEffect(() => {
        setIsFav(favProd.some(fitem => fitem === item._id))
    }, [favProd])

    const handelFav = () => {
        // comparer favProd (produit dans wishlist) avec item (produit dans la page)
        if (isFav) {
            removeToWishlistData()
        } else {
            addToWishlistData()
        }
    }
    useEffect(() => {
        if (isFav === true) {
            setFavImg(favon)
        }
        else {
            setFavImg(favoff)
        }
    }, [isFav])

    

    const resAdd = useSelector(state => state.wishListReducer.addWishList)
    const resRemove = useSelector(state => state.wishListReducer.removeWishList)



    const addToWishlistData = async () => {
        setIsFav(true)
        setFavImg(favon)
        
        setLoadingAdd(true)
        await dispatch(addProductToWishlist({ productId: item._id }))
        setLoadingAdd(false)    
    }

    const removeToWishlistData = async () => {
        setIsFav(false)
        setFavImg(favoff)

        setLoadingRemove(true)
        await dispatch(removeProductToWishlist(item._id))
        setLoadingRemove(false)
    }

    useEffect(() => {
        if (loadingAdd === false) {
            console.log(resAdd)
            if (resAdd && resAdd.status === 200) {
                notify('تم اضافة الى قائمة المفضلات بنجاح', 'success')
            }
            else if (resAdd && resAdd.status === 401) {
                notify('انت غير مسجل', 'error')
            }
        }
    }, [loadingAdd])

    useEffect(() => {
        if (loadingRemove === false) {
            console.log(resRemove)
            if (resRemove && resRemove.status === 'success') {
                notify('تم الحذف من قائمة المفضلات بنجاح', 'warn')
            }
            else if (resAdd && resAdd.status === 401) {
                notify('انت غير مسجل', 'error')
            }
        }
    }, [loadingRemove])
    
    return [favImg, handelFav]
}

export default ProductCardHook