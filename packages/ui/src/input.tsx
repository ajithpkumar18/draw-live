
function InputUI({ classname, type, placeholder, onchange }: { classname: string, type: string, placeholder: string, onchange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) {
    return (
        <input className={`rounded-lg px-3 py-2 text-white  ${classname}`} type={type} placeholder={placeholder} onChange={onchange} />
    )
}

export default InputUI