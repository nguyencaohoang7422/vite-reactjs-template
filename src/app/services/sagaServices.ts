import { router } from '@/app/router';

export function* navigate(path: string) {
  yield router.navigate(path);
}
