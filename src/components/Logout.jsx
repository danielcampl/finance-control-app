import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Button } from "@material-tailwind/react";

export default function Logout({ user }) {
    return (
        <section className='w-full flex flex-col justify-start gap-2'>
            <div className='flex justify-start gap-2 items-center justify-start'>
                <img src={user.photoURL} alt="userPhoto" className='w-8 h-8' />
                <span className='text-sm font-semibold'>{user.displayName}</span>
            </div>
            <Button
                className="w-44 h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]"
                onClick={() => signOut(auth)}
            >
                Sair
            </Button>
        </section>
    )
}