import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';

import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';

import { AppContext } from '@/context/AppContextProvider';

import { firstLevelMenu } from '@/helpers/helpers';

import styles from './Menu.module.scss';

const Menu: FC = (): JSX.Element => {
	const { menu, firstCategory, setMenu } = useContext(AppContext);

	const router = useRouter();

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory === secondCategory) {
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		hidden: {
			marginBottom: 0,
		},
	};
	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 27,
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((menu) => (
					<ul key={menu.route} className={styles.firstLevelList}>
						<li>
							<Link href={`/${menu.route}`}>
								<a
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: menu.id === firstCategory,
									})}
								>
									{menu.icon}
									<span>{menu.name}</span>
								</a>
							</Link>
						</li>
						{menu.id === firstCategory && buildSecondLevel(menu)}
					</ul>
				))}
			</>
		);
	};
	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu?.map((item) => {
					if (
						item.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
					) {
						item.isOpened = true;
					}
					return (
						<ul key={item._id.secondCategory}>
							<li
								className={styles.secondLevel}
								onClick={() => openSecondLevel(item._id.secondCategory)}
							>
								{item._id.secondCategory}
							</li>
							<motion.ul
								layout
								variants={variants}
								initial={item.isOpened ? 'visible' : 'hidden'}
								animate={item.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(item.pages, menuItem.route)}
							</motion.ul>
						</ul>
					);
				})}
			</div>
		);
	};
	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((page) => (
			<motion.li key={page._id} variants={variantsChildren}>
				<Link href={`/${route}/${page.alias}`}>
					<a
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]:
								`/${route}/${page.alias}` === router.asPath,
						})}
					>
						{page.category}
					</a>
				</Link>
			</motion.li>
		));
	};
	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
