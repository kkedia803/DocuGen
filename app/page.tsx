'use client';

import { useScroll, useTransform, motion, HTMLMotionProps } from 'framer-motion';
import { useRef } from 'react';
import Link from "next/link"
import { FileText, Github } from "lucide-react"
import Image from "next/image";
import { MaskText } from '@/components/MaskText';
import HeroImage, { Features, HeroText, HowItWorks } from '@/constants/Hero';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const MotionDiv: React.FC<HTMLMotionProps<'div'>> = motion.div;

export default function Home() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", 'end start']
  })
  const translateY = useTransform(scrollYProgress, [0, 1], ["80%", "-80%"]);
  const scale = useTransform(scrollYProgress, [0, 1], ['80%', '100%']);
  const word1 = "Transform your code into structural documents using AI. Create reports, research papers, documentation, and more with just a few clicks.";
  const word2 = "Easier than ever to generate your project document";
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="backdrop-blur-md fixed z-10 w-[100%] mx-auto py-3 shadow-md shadow-teal-300">
        <div className="w-full mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-16 z-10 overflow-hidden">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <FileText className="h-6 w-6 text-teal-200" />
            <span>DocuGen</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <div className="justify-center">
              <Link href='/login' className="py-2 px-5 inline-flex items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-transparent shadow-sm shadow-teal-200 text-neutral-200 hover:shadow-md hover:shadow-teal-200 hover:text-teal-100 transition-all disabled:opacity-50 disabled:pointer-events-none">
                Sign In
              </Link>

            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-24 backdrop-blur-md">
        <div className="overflow-hidden bg-gradient-to-br from-neutral-950 from-[50%] to-teal-200 h-screen">
          <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
            <div className="bg-linear-to-r from-violet-300/50 to-purple-100 blur-3xl w-100 h-175 rotate-[-60deg] transform -translate-x-40"></div>
            <div className="bg-linear-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[1440px] h-200 rounded-fulls origin-top-left -rotate-12 -translate-x-60"></div>
          </div>

          <div className="z-10">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-5 py-10 lg:py-12 lg:grid grid-cols-2">
              <div className="max-w-2xl my-auto">

                <div className="inline-block px-5">
                  <MaskText text={
                    <Github className="h-8 w-8 text-teal-200" />
                  } />
                </div>

                <div className="mt-5 w-full space-y-5 px-5">
                  <div>
                    {HeroText.map((data, index) => {
                      return (
                        <h1 key={index} className="block text-white text-4xl md:text-5xl">
                          <MaskText text={data.tagLine} />
                        </h1>
                      )
                    })}
                  </div>
                  <p className="text-gray-400 md:text-lg bg-clip-text" ref={container}>
                    {
                      word1.split("").map((letter, i) => {
                        return <motion.span
                          key={i}
                          initial={{ opacity: 0, y: -50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.1, ease: [0.33, 0.1, 0.01, 1] }}
                          viewport={{ once: true }}
                          style={{ translateY, scale }}
                        >{letter}</motion.span>
                      })
                    }
                  </p>
                </div>


                <div className="mt-8 gap-3 justify-center overflow-hidden h-20 px-5">
                  <motion.div
                    initial={{ y: "150%", }}
                    animate={{ y: "0", }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 1 }}
                    viewport={{ once: true }}
                  >
                    <Link href='/login' className="py-3 px-4 inline-flex items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-transparent shadow-sm shadow-teal-200 text-neutral-200 hover:shadow-md hover:shadow-teal-200 hover:text-teal-100 transition-all disabled:opacity-50 disabled:pointer-events-none">
                      Get started
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                  </motion.div>
                </div>
              </div>


              {/* hero images */}
              <div className="z-0 grid grid-cols-2 gap-5 items-center">
                {HeroImage.map((data, index) => {
                  return (
                    <div key={index} className="col-span-1 opacity-[2%] ease-in-out hover:!opacity-60 z-0 hover:z-10 hover:transition-transform hover:ease-in-out hover:duration-1000 p-5 overflow-hidden shadow-md shadow-teal-200 rounded-2xl duration-500 relative w-full h-full">
                      <Image
                        className="w-72 h-60 object-cover group"
                        src={data.img}
                        width={200}
                        height={200}
                        alt={data.alt} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 
        "
        // bg-gradient-to-b from-neutral-950 to-neutral-800
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">

              <div className="space-y-2">
                <h1 className="block text-white text-4xl md:text-5xl">
                  <MaskText text="How It Works" />
                </h1>
                <div className="max-w-[900px] text-neutral-400 md:text-lg/relaxed">
                  <MaskText text="Our platform makes it easy to create professional documents from your code" />
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8 p-2">
              {HowItWorks.map((data, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: "0", opacity: 1 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 * index }}
                    viewport={{ once: true }}
                  >

                    <Card className={`bg-gradient-to-tr from-neutral-950 from-[50%] to-neutral-100 border-0 text-white h-fit shadow-md hover:shadow-lg ease-in-out transition-all duration-300
                    ${index === 0 && "shadow-blue-400 hover:shadow-blue-400"}
                    ${index === 1 && "shadow-teal-200 hover:shadow-teal-200"}
                    ${index === 2 && "shadow-indigo-400 hover:shadow-indigo-400"}
                    `}>
                      <CardHeader>
                        <CardTitle className='font-medium text-base'>{data.heading}</CardTitle>
                        <CardDescription className='text-neutral-300 text-sm'>{data.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* <p>Card Content</p> */}
                        <Image
                          className="w-full h-fit object-cover"
                          src={data.img}
                          width={200}
                          height={200}
                          alt={data.heading} />
                      </CardContent>
                      {/* <CardFooter>
                      <Link href='/login' className="py-3 px-4 inline-flex items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-transparent shadow-sm shadow-teal-200 text-neutral-200 hover:shadow-md hover:shadow-teal-200 hover:text-teal-100 transition-all disabled:opacity-50 disabled:pointer-events-none text-sm">
                      Get started
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </Link>
                      </CardFooter> */}
                    </Card>
                  </motion.div>
                )
              })}

            </div>


          </div>
        </section>

        {/* Features */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">

              <div className="space-y-2">
                <h1 className="block text-white text-4xl md:text-5xl">
                  <MaskText text="Documentation Types Available" />
                </h1>
                <div className="max-w-[900px] text-neutral-400 md:text-lg/relaxed">
                  <MaskText text="Our platform makes it easy to create professional documents from your code" />
                </div>
              </div>
            </div>

            <div className="grid-cols-1 gap-6 grid md:grid-cols-1 lg:gap-12 mt-8 p-2">
              {Features.map((data, index) => {
                return (
                  <div key={index} className={`max-w-6xl rounded-lg overflow-hidden shadow-md shadow-teal-200
                    ${index === (1) && 'ml-auto'}
                    ${index === (3) && 'ml-auto'}
                    ${index === (5) && 'ml-auto'}
                  `}>
                    <motion.div
                      key={index}
                      initial={{ x: "-100%", opacity: 0 }}
                      whileInView={{ x: "0", opacity: 1, }}
                      transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.2 * index }}
                      viewport={{ once: true }}
                    >

                      <div className={`bg-gradient-to-tr from-neutral-950 from-[50%] to-neutral-100 border-0 text-white h-fit md:flex items-center
                      ${index === (1) && 'flex-row-reverse bg-gradient-to-tl'}
                    ${index === (3) && 'flex-row-reverse bg-gradient-to-tl'}
                    ${index === (5) && 'flex-row-reverse bg-gradient-to-tl'}
                    `}>
                        <div className='md:w-1/2 px-10 space-y-2'>
                          <div className='text-base uppercase font-semibold'>{data.heading}</div>
                          <div className='text-neutral-300 text-sm'>{data.description}</div>
                        </div>
                        <div className='md:w-1/2'>
                          <Image
                            className="w-fit h-fit object-cover"
                            src={data.img}
                            width={200}
                            height={200}
                            alt={data.heading} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )
              })}

            </div>


          </div>
        </section>


      </main >
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-neutral-400 dark:text-neutral-400">
            &copy; 2025 DocuGen. All rights reserved.
          </p>
        </div>
      </footer>
    </div >
  )
}

