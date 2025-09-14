export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'tracking-tigher mt-2 text-sm text-red-600' + className}>
            {message}
        </p>
    ) : null;
}
