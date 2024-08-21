"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import { useExitModal } from '@/store/use-exit-modal';

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useExitModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex flex-row items-center justify-center w-full mb-5'>
                        <Image
                            src='/mascot_sad.svg'
                            alt='Mascot exit modal'
                            width={80}
                            height={80}
                        />
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                        Espera, no te vayas aún
                    </DialogTitle>
                    <DialogDescription className='text-center text-base'>
                        Estas a punto de dejar la leccion, Estas seguro que deseas salir?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button
                            variant="primary"
                            className='w-full'
                            size="lg"
                            onClick={close}
                        >
                            Seguir aprendiendo
                        </Button>
                        <Button
                            variant="dangerOutline"
                            className='w-full'
                            size="lg"
                            onClick={ () => {
                                close();
                                router.push("/learn")
                            }}
                        >
                            Finalizar sesión
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};