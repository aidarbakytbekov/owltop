import { FC, FunctionComponent, ReactNode, useState } from 'react';

import styles from './Layout.module.scss';
import Footer from './footer/Footer';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import ScrollButton from '../ui/scrollButton/ScrollButton';

interface ILayout {
	children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.body} tabIndex={0} role="main">
				{children}
			</main>
			<Footer className={styles.footer} />
			<ScrollButton/>
		</div>
	);
};

export default Layout;
