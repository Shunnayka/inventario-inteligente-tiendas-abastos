import { useAppData } from '../context/AppDataContext';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';

export function RootNavigator() {
  const { auth } = useAppData();
  return auth.autenticado ? <MainTabs /> : <AuthStack />;
}
