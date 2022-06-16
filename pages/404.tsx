import { FC } from 'react';

import { withLayout } from '@/components/layout/WithLayout';

const Error404: FC = (props) => {
	return <div>Ошибка 404! Страница не найдена</div>;
};

export default withLayout(Error404);
