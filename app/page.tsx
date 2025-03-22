'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Link from "next/link"
import { FileText, Github } from "lucide-react"
import Image from "next/image";

export default function Home() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", 'end start']
  })
  const translateY = useTransform(scrollYProgress, [0, 1], ["80%", "-80%"]);
  const scale = useTransform(scrollYProgress, [0, 1], ['80%', '100%']);
  const word1 = "Transform your code into structured documents using AI. Create reports, research papers, documentation, and more with just a few clicks.";
  const word2 = "Easier than ever to generate your project document";
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="backdrop-blur-md fixed z-10 w-[100%] mx-auto py-3 border-b border-neutral-700">
        <div className="w-full mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-16 z-10 overflow-hidden">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <FileText className="h-6 w-6 text-primary" />
            <span>DocuGen</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <div className="justify-center">
              <Link href='/login' className="py-2 px-5 inline-flex items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-transparent shadow-sm shadow-white text-red-500 hover:shadow-md hover:shadow-white transition-all disabled:opacity-50 disabled:pointer-events-none">
                Sign In
              </Link>

            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-24 backdrop-blur-md">
        <div className="overflow-hidden bg-gradient-to-br from-neutral-950 from-[50%] to-neutral-700 h-screen">
          <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
            <div className="bg-linear-to-r from-violet-300/50 to-purple-100 blur-3xl w-100 h-175 rotate-[-60deg] transform -translate-x-40"></div>
            <div className="bg-linear-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[1440px] h-200 rounded-fulls origin-top-left -rotate-12 -translate-x-60"></div>
          </div>

          <div className="z-10">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-0 py-10 lg:py-16 lg:grid grid-cols-2">
              <div className="max-w-2xl textcenter mxauto">

                <div className="inline-block">
                  <Github className="h-8 w-8 text-red-500 mb-4" />
                </div>

                <div className="mt-5 w-full space-y-5">
                  <h1 className="block font-semibold text-white text-4xl md:text-5xl lg:text-6xl">
                  Easier than ever to generate your project document
                  </h1>
                  <p className="text-gray-500 md:text-lg dark:text-gray-400 bg-clip-text tracking-widest" ref={container}>
                    {
                      word1.split("").map((letter, i) => {
                        return <motion.span
                        key={i}
                          initial={{ opacity: 0, y: -50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i, duration: 1.5, ease: [0.33, 1, 0.68, 2] }}
                          // threshold={0.9999999}
                          viewport={{ once: true }}
                          style={{ translateY, scale }}
                        >{letter}</motion.span>
                      })
                    }
                  </p>
                </div>



                <div className="mt-8 gap-3 justify-center">
                  <Link href='/login' className="py-3 px-4 inline-flex items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-transparent shadow-sm shadow-white text-red-500 hover:shadow-md hover:shadow-white transition-all disabled:opacity-50 disabled:pointer-events-none">
                    Get started
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </Link>

                </div>
              </div>

              <div className="z-0">
                <div className="absolute top-[15vh] right-[28%] opacity-5 ease-in-out hover:!opacity-60 hover:z-10 hover:transition-transform hover:ease-in-out hover:duration-1000 p-5 overflow-hidden shadow-md shadow-neutral-600 rounded-2xl duration-500">
                  <Image
                    className="w-60"
                    src='/Hero1.png'
                    width={200}
                    height={200}
                    alt={""} />
                </div>
                <div className="absolute top-[65vh] right-[28%] opacity-5 ease-in-out hover:!opacity-60 hover:z-10 hover:transition-transform hover:ease-in-out hover:duration-1000 p-5 overflow-hidden shadow-md shadow-neutral-600 rounded-2xl duration-500">
                  <Image
                    className="w-60"
                    src='/Hero2.png'
                    width={200}
                    height={200}
                    alt={""} />
                </div>
                <div className="absolute top-[25vh] right-28 opacity-5 ease-in-out hover:!opacity-60 hover:z-10 hover:transition-transform hover:ease-in-out hover:duration-1000 p-5 overflow-hidden shadow-md shadow-neutral-600 rounded-2xl duration-500">
                  <Image
                    className="w-60"
                    src='/Hero3.png'
                    width={200}
                    height={200}
                    alt={""} />
                </div>
                <div className="absolute top-[55vh] right-28 opacity-5 ease-in-out hover:!opacity-60 hover:z-10 hover:transition-transform hover:ease-in-out hover:duration-1000 p-5 overflow-hidden shadow-md shadow-neutral-600 rounded-2xl duration-500">
                  <Image
                    className="w-60"
                    src='/Hero4.png'
                    width={200}
                    height={200}
                    alt={""} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Our platform makes it easy to create professional documents from your code
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold">Connect GitHub</h3>
                <p className="text-center text-neutral-400 dark:text-neutral-400">
                  Link your GitHub account and select a repository
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold">Choose Document Type</h3>
                <p className="text-center text-neutral-400 dark:text-neutral-400">
                  Select the type of document you want to generate
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold">Generate & Download</h3>
                <p className="text-center text-neutral-400 dark:text-neutral-400">
                  Our AI creates your document, which you can edit and download
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-neutral-400 dark:text-neutral-400">
            &copy; 2025 DocuGen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

