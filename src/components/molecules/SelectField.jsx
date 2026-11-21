import Label from "../atoms/Label";
import Select from "../atoms/Select";

export default function SelectField({ id, label, value, options, placeholder, onChange, className, wrapperClass, animKey = 0 }){
    return (
        <div className={wrapperClass}>
            <Label htmlFor={id}>{label}</Label>
            <Select 
                key={animKey} 
                id={id} 
                className={`${className} ${animKey > 0 ? "select-updated": ""}`} 
                value={value} 
                options={options}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}