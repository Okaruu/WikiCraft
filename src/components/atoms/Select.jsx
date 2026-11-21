export default function Select({ options = [], placeholder, ...props}){
    return (
        <select {...props}>
            {placeholder && <option value="" hidden>{placeholder}</option>}
            {options.map((o) => (
                <option key={o.valor} value={o.valor}>{o.nombre}</option>
            ))}
        </select>
    );
}