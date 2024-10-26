import { checkAdminToken } from '@/utils/tokenHandler';
import { useNavigate } from 'react-router-dom';

export default function RegisterButton({ path }) {
  const navigate = useNavigate();
  return (
    <div>
      {checkAdminToken() ? (
        <div
          className="px-5 flex justify-end items-end mb-8"
          onClick={() => navigate(`/admin-page/register-${path}`)}
        >
          <button className="text-main bg-black px-8 py-2 rounded-full border border-main hover:bg-main hover:border-main hover:text-black">
            등록하기
          </button>
        </div>
      ) : null}
    </div>
  );
}
