import cn from 'classnames';
import { FC } from 'react';
import Button from '../button/Button';

import styles from './BurgerButton.module.scss';
import { IBurgerButton } from './burger-button.interface';

const BurgerButton: FC<IBurgerButton> = ({
	active,
	className,
	onClick,
	...rest
}): JSX.Element => {
	return (
		<Button
			{...rest}
			onClick={onClick}
			className={cn(styles.btn, className, {
				[styles.active]: active,
			})}
			appearance="ghost"
		>
			<span></span>
		</Button>
	);
};

export default BurgerButton;
