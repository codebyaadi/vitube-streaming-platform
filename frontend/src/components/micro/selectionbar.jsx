import React from 'react'

const SelectBar = ({text}) => {
  return (
    <div id="selected-file" className="bg-black rounded-lg shadow-lg px-3 py-3">
    <div className="flex items-center text-white">
      <svg className="h-6 w-6 text-green-100 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" className="fill-current text-green-500" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
      </svg>          
      <span id="file-name" className="font-medium text-white">{text}</span>&nbsp;
    </div>
  </div>
  )
}

export default SelectBar