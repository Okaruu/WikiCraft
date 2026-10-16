import Label from "../atoms/Label";
import Input from "../atoms/Input";

function FormField({ id, label, ...inputProps }) {
    return (
        <div className="form-field">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...inputProps} />
        </div>
    );
}

export default FormField;