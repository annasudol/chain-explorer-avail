type ErrorMessageProps = {
  message: string;
};
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
