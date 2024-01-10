import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer, Navbar } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData } from "@/data";
import { SignIn, SignUp} from "@/pages/auth";

export function Home() {
    return (
        <>
            <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                <Navbar routes={[
                    {
                        name: "Login",
                        path: "/sign-in",
                        element: <SignIn />,
                    },
                    {
                        name: "Register",
                        path: "/sign-up",
                        element: <SignUp />,
                    },
                ]} />
            </div>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                ThinkSync
                            </Typography>
                            <Typography
                                variant="h4"
                                color="white"
                                className="mb-6 font-black"
                            >
                                Your story starts with us.
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                Explore the next generation of note-taking with our app. This isn't just a Landing Page; it's a gateway to an immersive experience powered by cutting-edge technology. Unleash the potential of AI, with intelligently crafted components inspired by the seamless fusion of Tailwind CSS and Material Design by Google.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="-mt-32 bg-white px-4 pb-20 pt-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuresData.map(({ color, title, icon, description }) => (
                            <FeatureCard
                                key={title}
                                color={color}
                                title={title}
                                icon={React.createElement(icon, {
                                    className: "w-5 h-5 text-white",
                                })}
                                description={description}
                            />
                        ))}
                    </div>
                    <div className="mt-32 flex flex-wrap items-center">
                        <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                                <FingerPrintIcon className="h-8 w-8 text-white " />
                            </div>
                            <Typography
                                variant="h3"
                                className="mb-3 font-bold"
                                color="blue-gray"
                            >
                                Elevate Your Note-Taking Experience with AI
                            </Typography>
                            <Typography className="mb-8 font-normal text-blue-gray-500">
                                Our AI-based notes app revolutionizes the way you take notes. With advanced features like text summarization, contextual note-taking, and image-to-notes capabilities, your note-taking experience will never be the same.
                                <br />
                                <br />
                                Experience the power of AI in your hands. Summarize lengthy texts, take contextual notes effortlessly, and convert images into meaningful notes using our cutting-edge technology.
                            </Typography>
                        </div>
                        <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
                            <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                                <CardHeader floated={false} className="relative h-56">
                                    <img
                                        alt="Card Image"
                                        src="https://i.pinimg.com/736x/5a/50/80/5a50805c733f17d4d18b48339c8b719a.jpg"
                                        className="h-full w-full object-cover"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="small" color="blue-gray" className="font-normal">AI-Enhanced Notes</Typography>
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="mb-3 mt-2 font-bold"
                                    >
                                        Transform Your Ideas
                                    </Typography>
                                    <Typography className="font-normal text-blue-gray-500">
                                        Harness the power of artificial intelligence to capture, summarize, and contextualize your thoughts. Our app is designed to enhance your productivity and make note-taking an intelligent and efficient process.
                                    </Typography>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4 pt-20 pb-48">
                <div className="container mx-auto">
                    <PageTitle section="Our Top Users" heading="Here are our top users this month">
                        According to leading AI researchers, Dr. Ted Scambos, a prominent scientist at NSIDC, has highlighted the potential for a groundbreaking record in note-taking technology. His insights into the capabilities of our AI-driven notes app suggest a revolutionary advancement in maximizing efficiency and productivity.
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {teamData.map(({ img, name, position, socials }) => (
                            <TeamCard
                                key={name}
                                img={img}
                                name={name}
                                position={position}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
        </>
    );
}

export default Home;
