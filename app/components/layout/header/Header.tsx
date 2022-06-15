import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';

import Logo from '@/components/ui/Logo';


import BurgerButton from '../../ui/burgerButton/BurgerButton';
import Sidebar from '../sidebar/Sidebar';

import styles from './Header.module.scss';
import { IHeader } from './header.interface';
import { useRouter } from 'next/router';

const Header: FC<IHeader> = ({ className, ...props }): JSX.Element => {
	const router = useRouter()
	const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false);
	useEffect(() => {
		setIsOpenedMenu(false)
	}, [router])

	const variants = {
		opened: {
			x: 0,
			transition: {
				stiffness: 20,
			},
		},
		closed: {
			x: 100,
		},
	};
	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo />
			<BurgerButton onClick={() => setIsOpenedMenu(true)} active={false} />
			<AnimatePresence>
				{isOpenedMenu && (
					<motion.div
						className={styles.mobileMenu}
						variants={variants}
						exit={{
							opacity: 0,
							x: 100,
							transition: {
								duration: 0.25
							}
						}}
						initial={'closed'}
						animate={isOpenedMenu ? 'opened' : 'closed'}
					>
						<Sidebar />
						<BurgerButton
							className={styles.menuClose}
							onClick={() => setIsOpenedMenu(false)}
							active
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
