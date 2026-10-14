export default function SelectField({ id, label, value, options, placeholder, onChange, className, wrapperClass }){
    return (
        <div className={wrapperClass}>
            <label htmlFor={id}>{label}</label>
            <select id={id} className={className} value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="" hidden>{placeholder}</option>
                {options.map((o)=> (
                    <option key={o.valor} value={o.valor}>{o.nombre}</option>
                ))}
            </select>
        </div>
    );
}