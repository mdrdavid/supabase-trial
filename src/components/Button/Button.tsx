import Link from 'next/link';

function Button({ text, url }: any) {
    return (
        <Link href={url}>
            <button
                type="submit"
                className="text-white rounded p-5 bg-[#00325a] cursor-pointer"
                style={{ width: 'max-content' }}
            >
                {text}
            </button>
        </Link>
    );
}

export default Button;
