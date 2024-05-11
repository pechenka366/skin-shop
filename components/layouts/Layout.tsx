'use client'
import React, { MutableRefObject, useRef } from 'react';
import Header from '../modules/Header/Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileNavbar from '../modules/MobileNavBar/MobileNavBar';
import { AnimatePresence, motion } from 'framer-motion';
import SearchModal from '../modules/Header/SearchModal';
import { useUnit } from 'effector-react';
import { $searchModal, $showQuickViewModal, $showSizeTable, showQuickViewModal, showSizeTable } from '@/context/modals';
import { handleCloseAuthPopup, handleCloseSearchModal } from '@/lib/utils/common';
import Footer from '../modules/Footer/Footer';
import { basePropsForMotion } from '@/constants/motion';
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal';
import SizeTable from '../modules/SizeTable/SizeTable';
import { $openAuthPopup, openAuthPopup } from '@/context/auth';
import AuthPopup from '../modules/AuthPopup/AuthPopup';

const Layout = ({ children }: {
    children: React.ReactNode
}) => {
    const isMedia800 = useMediaQuery(800)
    const searchModal = useUnit($searchModal)
    const showQuickViewModal = useUnit($showQuickViewModal)
    const showSizeTable = useUnit($showSizeTable)
    const openAuthPopup = useUnit($openAuthPopup)
    const authWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

    const handleCloseAuthPopupByTarget = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        const target = e.target as Element
    
        if (target === authWrapperRef.current) {
          handleCloseAuthPopup()
        }
      }

    return (
        <>
            <Header />
            {children}
            {isMedia800 && <MobileNavbar />}
            <AnimatePresence>
                {openAuthPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className='auth-popup-wrapper'
                        onClick={handleCloseAuthPopupByTarget}
                        ref={authWrapperRef}
                    >
                        <AuthPopup />
                    </motion.div>
                )}
                {searchModal && (
                    <motion.div
                        initial={{ opacity: 0, zIndex: 102 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SearchModal />
                    </motion.div>
                )}
                {showSizeTable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SizeTable />
                    </motion.div>
                )}
            </AnimatePresence>
            {!isMedia800 && (
                <AnimatePresence>
                    {showQuickViewModal && (
                        <motion.div
                            {...basePropsForMotion}
                            initial={{ opacity: 0, zIndex: 6 }}
                        >
                            <QuickViewModal />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
            <div className={`header__search-overlay ${searchModal ? 'overlay-active' : ''}`}
                onClick={handleCloseSearchModal} />
            <Footer />
        </>
    );
};

export default Layout;
