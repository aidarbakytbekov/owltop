import {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import { topApi } from '../../app/configs/api.config';
import { firstLevelMenu } from '../../app/helpers/helpers';
import { MenuItem } from '../../app/interfaces/menu.interface';
import { withLayout } from '@/components/layout/WithLayout';

const TopPage: NextPage<TypeProps> = (props) => {
	return <div>TopPage</div>;
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map((m) => '/' + m.route),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params?.type
	);
	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	const { data: menu } = await topApi.findTopPage(firstCategoryItem.id);

	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id,
		},
	};
};

interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
