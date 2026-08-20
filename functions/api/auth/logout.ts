import { withCookie } from '../../_helpers';

export async function onRequestPost({ request }: any) {
  return withCookie(new Response(null, { status: 204 }), null, isSecure(request));
}

function isSecure(request: Request): boolean {
  return new URL(request.url).protocol === 'https:';
}
