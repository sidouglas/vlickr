export type SearchFormProps = {
  handleOnChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFetching: boolean;
};
