import cn from 'classnames';
import { FC } from 'react';

import styles from './Sort.module.scss';
import SortIcon from './SortIcon';
import { ISort, SortEnum } from './sort.interface';

const Sort: FC<ISort> = ({ setSort, sort, className, ...rest }) => {
	return (
		<div {...rest} className={cn(styles.sort, className)}>
			<span onClick={() => setSort(SortEnum.Rating)} className={cn({
        [styles.active]: sort === SortEnum.Rating
      })}>
				<SortIcon />
        По рейтингу 
			</span>
			<span onClick={() => setSort(SortEnum.Price)} className={cn({
        [styles.active]: sort === SortEnum.Price
      })}>
				<SortIcon />
        По цене 
			</span>
		</div>
	);
};

export default Sort;
