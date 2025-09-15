import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Button } from "@material-tailwind/react";

export default function Logout({ user }) {    
    return (
        <section className='w-full flex flex-col justify-start gap-2'>
            <div className='flex justify-start gap-2 items-center'>
                <img src={user.photoURL} alt="userPhoto" className='hidden md:w-8 md:h-8 md:block' />
                <span className='hidden md:text-sm md:font-semibold md:block'>{user.displayName}</span>
            </div>
            <Button
                className="w-20 h-10 md:w-44 md:h-full text-xs md:text-base font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]"
                onClick={() => signOut(auth)}
            >
                Sair
            </Button>
        </section>
    )
}