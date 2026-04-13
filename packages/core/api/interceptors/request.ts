import { useUserState } from '../../states/use-user-state';
import { getLocale } from '../../constants';

export function applyRequestInterceptor(headers: Headers): Headers {
  headers.set('Content-Type', 'application/json');
  headers.set('Content-Language', getLocale());

  const token = useUserState.getState().token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Accept-Language', '');
  }

  return headers;
}
