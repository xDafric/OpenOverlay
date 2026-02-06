import { FieldLabel } from "../ui/field";

export type RequiredLabelProps = React.ComponentProps<typeof FieldLabel> & {
  required?: boolean;
};

const RequiredLabel: React.FC<RequiredLabelProps> = (props) => {
  return (
    <FieldLabel {...props}>
      {props.children}
      {props.required && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
};

export default RequiredLabel;
