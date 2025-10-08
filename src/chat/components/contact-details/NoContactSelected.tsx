import React from 'react'

export const NoContactSelected = () => {
  return (
  <div className="flex flex-col items-center justify-center h-full py-20">
    <div className="bg-gray-100 border-l-4 border-gray-400 text-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center max-w-xs">
      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
      <span className="text-lg font-semibold mb-1">Ningún cliente seleccionado</span>
      <span className="text-sm text-gray-700 text-center">
        Por favor, selecciona un cliente de la lista para ver los detalles de contacto.
      </span>
    </div>
  </div>
  )
}
