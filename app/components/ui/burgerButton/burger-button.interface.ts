import { ButtonHTMLAttributes } from 'react';

export interface IBurgerButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	active: boolean
	onClick: () => void
}
