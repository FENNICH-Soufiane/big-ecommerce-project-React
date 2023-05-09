// this hook for edit user data
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserPassword, updateUserProfileData } from '../../redux/actions/authAction'
import notify from '../../hook/useNotification'
import { useNavigate } from 'react-router-dom'

const ProfileHook = () => {
  // console.log(JSON.parse(localStorage.getItem('user')))
  let user = []
  if (localStorage.getItem('user') !== null)
    user = (JSON.parse(localStorage.getItem('user')))

  // logique pour modifier les addresses
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  // i y pas de phone dans le backend
  const [phone, setPhone] = useState(user.phone)

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePhone = (e) => {
    setPhone(e.target.value)
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelSubmit = async () => {
    // ce code pour eviter le msg d'erreur comme quoi l'email existe deja quand en la changeant pas lors de l'update
    let body
    if(user.email === email) {
      body = {
        name,
        // email:user.email,
        phone
      }
    } else {
      body= {
        name,
        email,
        phone
      }
    }
    setLoading(true)
    await dispatch(updateUserProfileData(body))
    setLoading(false)

    setShow(false)

  }

  const res = useSelector(state => state.authReducer.userProfile)

  useEffect(() => {
    if (loading === false) {
      console.log(res)
      if (res && res.status === 200) {

        localStorage.setItem('user', JSON.stringify(res.data.data))
        notify(' تم التحديث بنجاح', 'success')

        setTimeout(() => {
          window.location.reload()
        }, 1500);
      }
      else {
        
        notify('يجب ان تحدث الايميل والاسم طبقا للبيانات نود جي اس', 'warn')
      }
    }
  }, [loading])

  /// change user password

  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loadingPass, setLoadingPass] = useState(true)



  const onChangeOldPassword = (e) => {
    setOldPassword(e.target.value)
  }
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value)
  }
  const onChangeConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value)
  }

  const changePassword = async () => {
    if (confirmNewPassword !== newPassword) {
      notify(' تاكيد كلمة المرور الجديدة غير متطابق', 'warn')
      return
    }
    setLoadingPass(true)

    await dispatch(updateUserPassword({
      password: newPassword
      /// c'est deux champ n'existe pas en backend mais ils sont introduit dans le front end
      // currentPassword: oldPassword
      // passwordConfirm: confirmNewPassword
    }))
    setLoadingPass(false)
  }

  const resPass = useSelector(state => state.authReducer.userChangePassword)

  useEffect(() => {
    if (loadingPass === false) {
      if (resPass && resPass.status === 200) {

        console.log(resPass)

        setTimeout(() => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          window.location.reload()

        }, 1500);
        navigate('/login')
        notify('تم تغيير كلمة السر بنجاح', 'success')
      }

    }
  }, [loadingPass])


  return [user, show, handleClose, handleShow, handelSubmit, name, email, phone, onChangeName, onChangeEmail, onChangePhone, changePassword, oldPassword, newPassword, confirmNewPassword, onChangeOldPassword, onChangeNewPassword, onChangeConfirmNewPassword]
}

export default ProfileHook