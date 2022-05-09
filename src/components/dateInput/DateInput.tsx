import { DateInputProps } from "./DateInput.types";

export const DateInput = ({
  id,
  value,
  onChange,
  onBlur,
  message,
}: DateInputProps) => (
  <div className="row af-form__group af-form__group--required">
    <div className="col-md-2">
      <label htmlFor={id} className="af-form__group-label">
        Date de naissance
      </label>
    </div>
    <div className="col-md-10">
      <div className="af-form__text">
        <input
          id={id}
          type={"date"}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onBlur={onBlur}
          className="af-form__input-text col-md-3"
        />
      </div>
      {message && (
        <small className="af-form__message af-form__message--error">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          <span className="af-form__error-text">{message}</span>
        </small>
      )}
    </div>
  </div>
);
