import React from 'react'

const Jumbotron = (props) => {
  const { title, subtitle } = props
  return (
    <div class="p-10 text-center bg-gray-100 text-gray-700 shadow h-72 bg-bg-size-full shadow-black-700 mb-4 bg-bg-jumbo">
      <h2 class="font-semibold text-4xl mb-4">{title}</h2>
      <h4 class="font-semibold text-xl mb-6">{subtitle}</h4>

    </div>
  )
}

export default Jumbotron