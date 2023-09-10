function ImageText({ title, text }: any) {
    return (
        <div className="absolute bg-[#00325a] top-30 bottom-20 p-5 text-white">
            <h1 className="">{title}</h1>
            <p className="">{text}</p>
        </div>
    );
}

export default ImageText;
