import { FC } from 'react';

interface IconRecommendProps {
  className?: string;
}

const IconRecommend: FC<IconRecommendProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 19C7.75 19.4142 7.41421 19.75 7 19.75H5C4.58579 19.75 4.25 19.4142 4.25 19C4.25 18.5858 4.58579 18.25 5 18.25H7C7.41421 18.25 7.75 18.5858 7.75 19Z"
        fill="#1C274C"
      />
      <path
        opacity="0.4"
        d="M10 18V6C10 4.59987 10 3.8998 9.72752 3.36502C9.48783 2.89462 9.10538 2.51217 8.63498 2.27248C8.1002 2 7.40013 2 6 2C4.59987 2 3.8998 2 3.36502 2.27248C2.89462 2.51217 2.51217 2.89462 2.27248 3.36502C2 3.8998 2 4.59987 2 6V18C2 19.4001 2 20.1002 2.27248 20.635C2.51217 21.1054 2.89462 21.4878 3.36502 21.7275C3.8998 22 4.59987 22 6 22C7.40013 22 8.1002 22 8.63498 21.7275C9.10538 21.4878 9.48783 21.1054 9.72752 20.635C10 20.1002 10 19.4001 10 18Z"
        fill="#1C274C"
      />
      <g opacity="0.7">
        <path
          d="M10 8.24276V18C10 18.9186 10 19.5359 9.92304 20.0029L13.2219 16.7041L19.0599 10.6145C20.0332 9.6111 20.5199 9.10939 20.6964 8.53425C20.847 8.04375 20.843 7.5188 20.685 7.03065C20.4997 6.45826 19.9999 5.95847 19.0003 4.95892C18.0991 4.07259 17.6484 3.62942 17.1204 3.44458C16.6857 3.29244 16.2175 3.2633 15.7673 3.36039C15.2204 3.47834 14.7183 3.86221 13.7141 4.62996L13 5.24276L10 8.24276Z"
          fill="#1C274C"
        />
        <path
          d="M8.00288 21.923C8.00192 21.9232 8.00096 21.9234 8 21.9235V21.9259L8.00288 21.923Z"
          fill="#1C274C"
        />
      </g>
      <path
        d="M15.8143 14H17.8994C19.2995 14 19.9996 14 20.5344 14.2725C21.0048 14.5122 21.3872 14.8946 21.6269 15.365C21.8994 15.8998 21.8994 16.5999 21.8994 18C21.8994 19.4001 21.8994 20.1002 21.6269 20.635C21.3872 21.1054 21.0048 21.4878 20.5344 21.7275C19.9996 22 19.2995 22 17.8994 22H6C6.91721 22 7.53399 22 8.00069 21.9234L8 21.9259L8.00288 21.923C8.24762 21.8827 8.45107 21.8212 8.63498 21.7275C9.10538 21.4878 9.48783 21.1054 9.72752 20.635C9.82122 20.4511 9.8827 20.2476 9.92304 20.0029L13.2219 16.7041L15.8143 14Z"
        fill="#1C274C"
      />
    </svg>
  );
};

export default IconRecommend;
