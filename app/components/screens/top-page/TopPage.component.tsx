import Heading from 'components/ui/heading/Heading';
import parse from 'html-react-parser';
import { FC, useEffect, useReducer } from 'react';

import Advantages from '@/ui/advantages/Advantages';
import HhDataComponent from '@/ui/hhDataComponent/HhDataComponent';
import Product from '@/ui/product/Product';
import Sort from '@/ui/sort/Sort';
import { SortEnum } from '@/ui/sort/sort.interface';
import Tag from '@/ui/tag/Tag';

import { TopLevelCategory } from '@/interfaces/top-page.interface';

import { ITopPageComponent } from './TopPageComponent.interface';
import styles from './TopPageComponent.module.scss';
import { sortReducer } from './sort.reducer';

const TopPageComponent: FC<ITopPageComponent> = ({
	page,
	firstCategory,
	products,
}) => {
	const [{ products: sortedProducts, sort }, dispatch] = useReducer(
		sortReducer,
		{
			products,
			sort: SortEnum.Rating,
		}
	);

	const setSort = (sort: SortEnum) => {
		dispatch({ type: sort });
	};

	useEffect(() => {
		dispatch({ type: 'reset', initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Heading tag="h1">{page.title}</Heading>
				{products && (
					<Tag color="grey" size="m">
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts.length &&
					sortedProducts.map((p) => <Product layout key={p._id} product={p} />)}
			</div>
			<div className={styles.hhTitle}>
				<Heading tag="h2">Вакансии - {page.category}</Heading>
				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>
			{firstCategory === TopLevelCategory.Courses && page.hh ? (
				<HhDataComponent {...page.hh} />
			) : null}
			{page.advantages && page.advantages.length ? (
				<>
					<Heading className={styles.advantage_title} tag="h2">
						Преимущества
					</Heading>
					<Advantages advantages={page.advantages} />
				</>
			) : null}
			{page.seoText && (
				<div className={styles.seo_text}>{parse(page.seoText)}</div>
			)}
			<Heading className={styles.advantage_title} tag="h2">
				Получаемые навыки
			</Heading>
			{page.tags.map((tag) => (
				<Tag className={styles.tag} key={tag} color="primary">
					{tag}
				</Tag>
			))}
		</div>
	);
};

export default TopPageComponent;
