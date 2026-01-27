import { router } from '@/app/router';

export function* navigate(path: string, option?: any) {
  yield router.navigate(path, option);
}
