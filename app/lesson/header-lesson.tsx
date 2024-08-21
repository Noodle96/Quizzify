"use client";
import React from 'react'
import Image from 'next/image';
import { InfinityIcon, X } from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import { useExitModal } from '@/store/use-exit-modal';

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscripcion: boolean;
};
export const HeaderLesson = ({
    hearts,
    percentage,
    hasActiveSubscripcion,
}:Props) => {
    const { open } = useExitModal();
    return (
        <header className='lg:pt-[50px] pt-[20px] px-10 flex flex-row gap-x-7 items-center justify-between \
                            max-w-[1140px] mx-auto w-full'>
                                
            <X
                onClick={open}
                className='text-slate-500 hover:opacity-75 transition cursor-pointer'
            />

            <Progress value={percentage} />
            <div className='text-rose-500 flex flex-row items-center  font-bold'>
                <Image
                    src="/heart.svg"
                    height={28}
                    width={28}
                    alt='heart'
                    className='mr-2'
                />
                {hasActiveSubscripcion ? <InfinityIcon className='h-6 w-6 stroke-[3]'/> : hearts}
            </div>


        </header>
    )
}
