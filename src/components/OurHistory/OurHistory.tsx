import Button from '../Button/Button';

function OurHistory() {
    return (
        <div className="flex-1  flex-col gap-[50px] p-4">
            <div className="text">
                <h1
                    className="text-[40px] text-center bg-gradient-to-b from-[#194c33] to-[#bbb] bg-clip-text sm:text-[72px] "
                    style={{ WebkitTextFillColor: 'transparent' }}
                >
                    Hello world{' '}
                </h1>
                <p className="text-[18px] font-light text-justify sm:text-[24px]">
                    New Heritage children&apos;s home is a Ugandan National
                    registered non-for-profit making organization that is
                    currently operating in seven districts of Uganda that
                    include Mityana, Mubende, Kiboga, <br />
                    Gomba, Kyankwanzi, Kassanda and Kakumiro. Our community
                    based programs strive at improving the well-being of all
                    families we serve, partnering with them for a
                    self-sustainable society. We are a non-denominational and
                    political organization respecting all religions and cultures
                    in communities where we work.
                </p>

                <Button url="/services" text="See our work" />
            </div>
        </div>
    );
}

export default OurHistory;
