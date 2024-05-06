import { Navigate } from 'react-router-dom'

interface Props {
	children: React.ReactNode;
	redirectPath?: string;
}

export const ProtectedRoute: React.FC<Props> = ({ children, redirectPath = '/login' }) => {
	const userInfo = JSON.parse(localStorage.getItem('userSkyproMusic') || '{}');

	if (!userInfo) {
		return <Navigate to={redirectPath} replace />;
	}

	return <>{children}</>;
};
