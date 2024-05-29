import { useForm } from "react-hook-form";

export const DynamicForm = ({ fields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm
  <Inputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={index}>
          {field.type === 'text' && (
            <input
              type="text"
              placeholder={field.placeholder}
              name={field.name}
              {...register(field.name, { required: true })}
            />
          )}
          {field.type === 'email' && (
            <input
              type="email"
              placeholder={field.placeholder}
              name={field.name}
              {...register(field.name, {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
          )}
          {field.type === 'select' && (
            <select
              name={field.name}
              {...register(field.name, { required: true })}
            >
              <option value="">{field.placeholder}</option>
              {field.options &&
                field.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          )}
          {errors[field.name] && <span>This field is required</span>}
        </div>
      ))}
    </form>
  );
};
