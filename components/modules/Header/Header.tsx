'use client'
import Link from "next/link";
import { useUnit } from "effector-react";
import Menu from "./Menu";
import { $searchModal, openMenu, openSearchModal } from "@/context/modals";
import { addOverflowHiddenToBody, handleOpenAuthPopup, triggerLoginCheck } from "@/lib/utils/common";
import Logo from "@/components/elements/Logo/Logo";
import { useLang } from "@/hooks/useLang";
import CartPopup from "./CartPopup/CartPopup";
import HeaderProfile from "./HeaderProfile";
import { $isAuth } from "@/context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { loginCheckFx } from "@/api/auth";
import { useEffect } from "react";
import { triggerAsyncId } from "async_hooks";
import { $user } from "@/context/user";
import { useCartByAuth } from "@/hooks/useCartByAuth";
import { setLang } from "@/context/lang";
import { addProductsFromLSToCart, setCartFromLS } from "@/context/cart";
import { get } from "http";


const Header = () => {
  const isAuth = useUnit($isAuth)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const { lang, translations } = useLang()
  const user = useUnit($user)
  const currentCartByAuth = useCartByAuth()

  console.log(currentCartByAuth)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

useEffect(() => {
  const lang = JSON.parse(localStorage.getItem('lang') as string)
  const cart = JSON.parse(localStorage.getItem('cart') as string)

  if(lang){
    if (lang === 'ru' || lang === 'en'){
      setLang(lang)
    }
  }

  if(cart) {
    setCartFromLS(cart)
  }

  triggerLoginCheck()
}, [])

useEffect(() => {
  if (isAuth) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)

    if (cartFromLS  && Array.isArray(cartFromLS)) {
      addProductsFromLSToCart({
        jwt: auth.accessToken,
        cartItems: cartFromLS
      })
    }
  }
}, [isAuth])

  return (
    <header className='header'>
      <div className='container header__container'>
        <button className='btn-reset header__burger' onClick={handleOpenMenu}>
          {translations[lang].header.menu_btn}
        </button>
        <Menu />
        <div className='header__logo'>
          <Logo />
        </div>
        <ul className='header__links list-reset'>
          <li className='header__links__item'>
            <button
              className='btn-reset header__links__item__btn header__links__item__btn--search'
              onClick={handleOpenSearchModal} />
          </li>
          <li className='header__links__item'>
            <Link
              href='/favorites'
              className='header__links__item__btn header__links__item__btn--favorites'>
            </Link>
          </li>
          <li className='header__links__item'>
            <Link
              className='header__links__item__btn header__links__item__btn--compare'
              href='/comparison'>
            </Link>
          </li>
          <li className='header__links__item'>
            <CartPopup />
          </li>
          <li className='header__links__item header__links__item--profile'>
            {isAuth ? (
              <HeaderProfile />
            ) : loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <button
              className="btn-reset header__links__item__btn header__links__item__btn--profile"
              onClick={handleOpenAuthPopup} />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
