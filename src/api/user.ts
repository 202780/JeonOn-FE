import { api } from '@/utils/customAxios';

export async function getProfile() {
  const res = await api.get('/users');
  return res.data.data;
}

export async function getPartnersBookmark() {
  const res = await api.get('/users/bookmarks/partners');
  return res.data.data;
}
export async function getContentsBookmark() {
  const res = await api.get('/users/bookmarks/contents');
  return res.data.data;
}

export async function getBoothsBookmark() {
  const res = await api.get('/users/bookmarks/booths');
  return res.data.data;
}
