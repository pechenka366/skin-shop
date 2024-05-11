/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { useUnit } from 'effector-react'
import { useCartAction } from '@/hooks/useCartAction'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/size-table/index.module.scss'
import { useState } from 'react'
import { $sizeTableSizes } from '@/context/sizeTable'
import { $showQuickViewModal } from '@/context/modals'
import { closeSizeTableByCheck } from '@/lib/utils/common'
import AddToCartBtn from '../ProductListItem/AddToCartBtn'
import ProductCountBySize from '../ProductListItem/ProductCountBySize'

const SizeTable = () => {
  const [sSize, setSSize] = useState(false)
  const [mSize, setMSize] = useState(false)
  const [lSize, setLSize] = useState(false)
  const [xlSize, setXLSize] = useState(false)
  const [xxlSize, setXXLSize] = useState(false)
  const { lang, translations } = useLang()
  const showQuickViewModal = useUnit($showQuickViewModal)
  // const isAddToFavorites = useUnit($isAddToFavorites)
  const {
    selectedSize,
    setSelectedSize,
    handleAddToCart,
    cartItemBySize,
    addToCartSpinner,
    currentCartItems,
    updateCountSpinner,
    // updateCountSpinner,
    // product
  } = useCartAction(true)
  const isAnySizeSelected =
    sSize || lSize || mSize || xlSize || xxlSize || selectedSize
  // const { addToFavoritesSpinner, setAddToFavoritesSpinner } = useFavoritesAction(product)
  const productSizes = useUnit($sizeTableSizes)
  const isHeaddressType = productSizes.type === 'headdress'
  // const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  // const currentFavoriteItems = currentFavoritesByAuth.filter(
  //   (item) => item.productId === product._id
  // )
  // const favoriteItemBySize = currentFavoriteItems.find(
  //   (item) => item.size === selectedSize
  // )

  const handleSelectSSize = () => {
    setSelectedSize('s')
    setSSize(true)
    setMSize(false)
    setLSize(false)
    setXLSize(false)
    setXXLSize(false)
  }

  const handleSelectLSize = () => {
    setSelectedSize('l')
    setSSize(false)
    setMSize(false)
    setLSize(true)
    setXLSize(false)
    setXXLSize(false)
  }
  const handleSelectMSize = () => {
    setSelectedSize('m')
    setSSize(false)
    setMSize(true)
    setLSize(false)
    setXLSize(false)
    setXXLSize(false)
  }

  const handleSelectXLSize = () => {
    setSelectedSize('xl')
    setSSize(false)
    setMSize(false)
    setLSize(false)
    setXLSize(true)
    setXXLSize(false)
  }
  const handleSelectXXLSize = () => {
    setSelectedSize('xxl')
    setSSize(false)
    setMSize(false)
    setLSize(false)
    setXLSize(false)
    setXXLSize(true)
  }

  // const isSizeSelected = (size: string) => selectedSize === size

  // const checkInFavorites = (size: string) => currentFavoriteItems.find((item) => item.size === size)

  const headdressSizes = [
    {
      id: 1,
      headCircumference: '55',
      manufacturerSize: 'S',
      selectHandler: handleSelectSSize,
      isSelected: sSize,
      isAvailable: productSizes.sizes.s,
      isInFavorites: false,
    },
    {
      id: 2,
      headCircumference: '56-57',
      manufacturerSize: 'M',
      selectHandler: handleSelectMSize,
      isSelected: mSize,
      isAvailable: productSizes.sizes.m,
      isInFavorites: false,
    },
    {
      id: 3,
      headCircumference: '58-59',
      manufacturerSize: 'L',
      selectHandler: handleSelectLSize,
      isSelected: lSize,
      isAvailable: productSizes.sizes.l,
      isInFavorites: false,
    },
    {
      id: 4,
      headCircumference: '60-61',
      manufacturerSize: 'XL',
      selectHandler: handleSelectXLSize,
      isSelected: xlSize,
      isAvailable: productSizes.sizes.xl,
      isInFavorites: false,
    },
    {
      id: 5,
      headCircumference: '62-63',
      manufacturerSize: 'XXL',
      selectHandler: handleSelectXXLSize,
      isSelected: xxlSize,
      isAvailable: productSizes.sizes.xxl,
      isInFavorites: false,
    },
  ]

  const dressSizes = [
    {
      id: 1,
      russianSize: '44-46',
      manufacturerSize: 'S',
      bust: '78-82',
      waist: '58-62',
      hipGirth: '86-90',
      selectHandler: handleSelectSSize,
      isSelected: sSize,
      isAvailable: productSizes.sizes.s,
      isInFavorites: false,
    },
    {
      id: 2,
      russianSize: '48-50',
      manufacturerSize: 'M',
      bust: '82-86',
      waist: '62-66',
      hipGirth: '90-94',
      selectHandler: handleSelectMSize,
      isSelected: mSize,
      isAvailable: productSizes.sizes.m,
      isInFavorites: false,
    },
    {
      id: 3,
      russianSize: '50',
      manufacturerSize: 'L',
      bust: '86-90',
      waist: '66-70',
      hipGirth: '94-98',
      selectHandler: handleSelectLSize,
      isSelected: lSize,
      isAvailable: productSizes.sizes.l,
      isInFavorites: false,
    },
    {
      id: 4,
      russianSize: '52-54',
      manufacturerSize: 'XL',
      bust: '90-94',
      waist: '70-74',
      hipGirth: '98-102',
      selectHandler: handleSelectXLSize,
      isSelected: xlSize,
      isAvailable: productSizes.sizes.xl,
      isInFavorites: false,
    },
    {
      id: 5,
      russianSize: '56',
      manufacturerSize: 'XXL',
      bust: '94-98',
      waist: '74-78',
      hipGirth: '102-106',
      selectHandler: handleSelectXXLSize,
      isSelected: xxlSize,
      isAvailable: productSizes.sizes.xxl,
      isInFavorites: false,
    },
  ]

  // function handleCloseSizeTable(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error('Function not implemented.')
  // }

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  const addToCart = () => handleAddToCart(+(cartItemBySize?.count || 1))

  const trProps = (
    item:
      | {
        id: number
        russianSize: string
        manufacturerSize: string
        bust: string
        waist: string
        hipGirth: string
        selectHandler: () => void
        isSelected: boolean
        isAvailable: boolean
      }
      | {
        id: number
        headCircumference: string
        manufacturerSize: string
        selectHandler: () => void
        isSelected: boolean
        isAvailable: boolean
      }
  ) => ({
    onClick: item.selectHandler,
    style: {
      backgroundColor:
        item.isSelected || selectedSize === item.manufacturerSize.toLowerCase()
          ? '#9466FF'
          : 'transparent',
      pointerEvents: item.isAvailable ? 'auto' : 'none',
      opacity: item.isAvailable ? 1 : 0.5,
      color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
    },
  })

  // const handleAddProductToFavorites = () => {
  //   if (!isUserAuth()) {
  //     addFavoriteItemToLS(product, selectedSize)
  //     return
  //   }

  //   if (favoriteItemBySize) {
  //     toast.success('Добавлено в избранное!')
  //     return
  //   }

  //   const auth = JSON.parse(localStorage.getItem('auth') as string)

  //   const clientId = addFavoriteItemToLS(product, selectedSize, false)

  //   addProductToFavorites({
  //     jwt: auth.accessToken,
  //     productId: product._id,
  //     setSpinner: setAddToFavoritesSpinner,
  //     size: selectedSize,
  //     category: product.category,
  //     clientId,
  //   })
  // }

  return (
    <div
      className={`${styles.size_table} ${isHeaddressType ? styles.size_table_headdress : ''
        }`}
    >
      <button
        className={`btn-reset ${styles.size_table__close}`}
        onClick={handleCloseSizeTable}
      />
      <h2 className={styles.size_table__title}>
        {translations[lang].size_table.title}
      </h2>
      <div className={styles.size_table__inner}>
        <table className={styles.size_table__table}>
          <thead>
            {isHeaddressType ? (
              <tr>
                <th>{translations[lang].size_table.head_circumference}</th>
                <th>{translations[lang].size_table.size}</th>
              </tr>
            ) : (
              <tr>
                <th>{translations[lang].size_table.russian_size}</th>
                <th>{translations[lang].size_table.manufacturer_size}</th>
                <th>{translations[lang].size_table.chest_circumference}</th>
                <th>{translations[lang].size_table.waist_circumference}</th>
                <th>{translations[lang].size_table.hip_circumference}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isHeaddressType
              ? headdressSizes.map((headdressSizesItem) => (
                <tr
                  key={headdressSizesItem.id}
                  {...(trProps(
                    headdressSizesItem
                  ) as React.HTMLAttributes<HTMLTableRowElement>)}
                >
                  <td>
                    {/* {headdressSizesItem.isInFavorites && (
                      <span className={styles.size_table__favorite} 
                      />
                    )} */}
                    {headdressSizesItem.headCircumference}
                  </td>
                  <td>
                    <ProductCountBySize
                      size={headdressSizesItem.manufacturerSize}
                      products={currentCartItems}
                    />
                    {headdressSizesItem.manufacturerSize}
                  </td>
                </tr>
              ))
              : dressSizes.map((item) => (
                <tr
                  key={item.id}
                  {...(trProps(
                    item
                  ) as React.HTMLAttributes<HTMLTableRowElement>)}
                >
                  <td>
                    {/* {item.isInFavorites && (
                      <span className={styles.size_table__favorite} />
                    )} */}
                    {item.russianSize}
                  </td>
                  <td>{item.manufacturerSize}</td>
                  <td>{item.bust}</td>
                  <td>{item.waist}</td>
                  <td>
                    <ProductCountBySize
                        size={item.manufacturerSize}
                        products={currentCartItems}
                      />
                    {item.hipGirth}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddToCartBtn
        className={styles.size_table__btn}
        handleAddToCart={addToCart}
        addToCartSpinner={addToCartSpinner || updateCountSpinner}
        btnDisabled={!isAnySizeSelected || addToCartSpinner || updateCountSpinner}
        text={translations[lang].product.to_cart}
      />
    </div>
  )
}

export default SizeTable
