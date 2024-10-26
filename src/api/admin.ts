import { api } from '@/utils/customAxios';

//콘텐츠 등록 api
export async function postContents(formdata: any) {
  const result = await api.post('/admins/contents', formdata, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result;
}

//콘텐츠 삭제 api
export async function deleteContents(contentId: any) {
  const result = await api.delete(`/admins/contents/${contentId}`);
  return result;
}

//제휴업체 삭제 api
export async function deletePartners(partnerId: any) {
  const result = await api.delete(`/admins/partners/${partnerId}`);
  return result;
}

//지도 삭제 api
export async function deleteMaps(zoneId: any) {
  const result = await api.delete(`/admins/zones/${zoneId}`);
  return result;
}
