import React from 'react'
import { RotatingLines } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className='flex items-center justify-center '>
      <RotatingLines
        visible={true}
        height='200'
        width='200'
        color='grey'
        strokeWidth='5'
        animationDuration='0.75'
        ariaLabel='rotating-lines-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
