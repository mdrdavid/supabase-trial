import ProjectDescription from './ProjectDescription';
import ProjectCategory from './ProjectsCategory';

function Projects() {
    return (
        <div className="flex flex-col gap-[5px]">
            <ProjectDescription
                title="Improved access to equitable and quality education for learners in supported communities"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        vulputate, nulla ac ultricies mattis, odio urna consectetur
        est, vitae lacinia risus risus ac neque.
        Praesent volutpat, turpis sed pulvinar suscipit, lectus
        ligula commodo nisl, et cursus massa nulla eu felis. Morbi
        auctor, sem nec dignissim rutrum, justo urna venenatis urna,
        nec gravida"
            />
            <ProjectCategory />
        </div>
    );
}

export default Projects;
