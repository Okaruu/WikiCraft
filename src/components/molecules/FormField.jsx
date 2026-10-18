import Label from "../atoms/Label";
import Input from "../atoms/Input";

function FormField({ id, label, ...inputProps }) {
    return (
        <div className="form-field">
        <Label htmlFor={id} className="form-label mb-0">{label}</Label>
        <Input id={id} className="form-control" {...inputProps} />
        </div>
    );
}

export default FormField;