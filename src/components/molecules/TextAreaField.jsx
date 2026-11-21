import Label from "../atoms/Label";
import Textarea from "../atoms/Textarea";

export default function TextAreaField({id, label, ...textareaProps}){
    return (
        <div className="textarea-field">
            <Label htmlFor={id}>{label}</Label>
            <Textarea id={id} {...textareaProps}/>
        </div>
    );
}