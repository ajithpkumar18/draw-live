
function InputUI({ classname, type, placeholder }: { classname: string, type: string, placeholder: string }) {
    return (
        <input className={`rounded-lg p-3 ${classname}`} type={type} placeholder={placeholder} />
    )
}

export default InputUI