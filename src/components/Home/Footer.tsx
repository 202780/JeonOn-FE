import instagram from '@/../public/assets/svgs/instagram.svg';

export default function Footer() {
  return (
    <div className="px-4 flex flex-col justify-center items-center mb-5">
      <div className="text-xs font-normal text-white">
        ©JeonOn. All rights reserved.
      </div>
      <div className="text-[10px] font-normal text-white mb-5">
        ©2024 In collaboration with 전딧불이.
      </div>
      <div className="flex justify-center items-center">
        <div
          onClick={() => {
            window.open('https://www.instagram.com/cnu_festival/');
          }}
        >
          <img src={instagram} alt="instagram" />
        </div>
      </div>
    </div>
  );
}
