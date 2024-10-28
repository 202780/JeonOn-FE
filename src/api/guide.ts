import { api } from '@/utils/customAxios';

export async function getZones(index: string) {
  let location = '';
  if (index === '1') location = 'stadium';
  if (index === '2') location = '518-square';
  if (index === '3') location = 'backgate-street';
  const result = await api.get(`zones?location=${location}`);

  return result.data;
}

export async function getPartners() {
  const result = await api.get('partners');

  return result.data;
}

export async function getPartnerDetail(partnerId: any) {
  const result = await api.get(`partners/${partnerId}`);
  return result.data.data;
}

export async function partnersBookmark(partnerId: any) {
  const result = await api.post(`bookmarks/partners/${partnerId}`);
  return result;
}

export async function partnersBookmarkCancel(partnerId: any) {
  const result = await api.delete(`bookmarks/partners/${partnerId}`);
  return result;
}
