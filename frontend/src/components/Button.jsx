import React from 'react'

const Button = (props) => {
    return (
    <div>
        <button className="mx-auto block mt-5 bg-orange-500 px-4 py-1 rounded-md text-white hover:bg-orange-600 active:bg-orange-700 sm:mt-10">{props.text}</button>
    </div>
)
}

export default Button
