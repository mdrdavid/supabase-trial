function ProjectDescription({ title, description }: any) {
    return (
        <div className="mt-10 border-2">
            <h1 className="text-[20px] sm:text-[26px] font-light text-center sm:text-center text-[#00325a] px-4 pt-4">
                {title}
            </h1>
            <p className="text-[18px] font-light text-justify sm:text-[20px] p-4">
                {description}
            </p>
        </div>
    );
}

export default ProjectDescription;
