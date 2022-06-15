import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../app/assets/styles/globals.scss';
import { API_URL } from '../app/configs/api.config';

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<>
			<Head>
				<title>My top - наш лучший топ</title>
				<link rel="stylesheet" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://mc.yandex.ru" />
				<meta property="og:url" content={API_URL + router.asPath} />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
