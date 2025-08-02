
function InputUI({ classname, type, placeholder }: { classname: string, type: string, placeholder: string }) {
    return (
        <input className={`rounded-lg px-3 py-2 ${classname}`} type={type} placeholder={placeholder} />
    )
}

export default InputUI