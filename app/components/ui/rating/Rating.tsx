import cn from 'classnames';
import {
	ForwardedRef,
	KeyboardEvent,
	forwardRef,
	useEffect,
	useRef,
	useState,
} from 'react';

import styles from './Rating.module.scss';
import StarIcon from './StarIcon';
import { IRating } from './rating.interface';

const Rating = forwardRef(
	(
		{
			isEditable = false,
			error,
			rating,
			setRating,
			tabIndex,
			...props
		}: IRating,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (current: number, i: number): number => {
			if (!isEditable) {
				return -1;
			}
			if (!rating && i == 0) {
				return tabIndex ?? 0;
			}
			if (current == i + 1) {
				return tabIndex ?? 0;
			}
			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						key={i}
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable,
						})}
						onMouseEnter={() => changeDispay(i + 1)}
						onMouseLeave={() => changeDispay(rating)}
						onClick={() => onClick(i + 1)}
						tabIndex={computeFocus(rating, i)}
						onKeyDown={handleKey}
						ref={(r) => ratingArrayRef.current?.push(r)}
						role={isEditable ? 'slider' : ''}
						aria-invalid={error ? true : false}
						aria-valuenow={rating}
						aria-valuemax={5}
						aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
						aria-valuemin={1}
					>
						<StarIcon tabIndex={isEditable ? 0 : -1} onKeyDown={handleKey} />
					</span>
				);
			});
			setRatingArray(updatedArray);
		};

		const changeDispay = (i: number) => {
			if (!isEditable) {
				return;
			}
			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(i);
		};

		const handleKey = (e: KeyboardEvent) => {
			if (!isEditable || !setRating) {
				return;
			}
			if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.ratingWrapper, {
					[styles.error]: error,
				})}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);

Rating.displayName = 'Rating';

export default Rating;