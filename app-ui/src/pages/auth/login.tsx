import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod'
import { object, string, TypeOf } from 'zod';

const createSessionSchema = object({
    email: string({
        required_error: 'Email is required',
    }).min(1, "Email required"),
    password: string({
        required_error: 'Password is required',
    }).min(1, "Password required"),
});

// const createSessionSchema = object({
//     email: string().nonempty({
//         message: "Email is required",
//     }),
//     password: string().nonempty({
//         message: "Password is required",
//     }),
// });

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
    const router = useRouter();
    // @ts-ignore
    const { loginError, setLoginError } = useState(null);
    const { 
        register, 
        formState: {errors},
        handleSubmit
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema), 
    });

    async function onSubmit(values: CreateSessionInput){
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                values,
                { withCredentials: true},
            );
            router.push("/"); // Logged in user gets routed to homepage
        } catch(e: any) {
            // This function doesn't exist and throws an error?
            setLoginError(e.message);
        };
    };


    return (
        <>
            <p>{loginError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-element'>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type='email' 
                        placeholder='jane.doe@example.com'
                        {...register("email")}
                    />
                    <p><>{errors.email?.message}</></p>
                </div>
                <div className='form-element'>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        type='password' 
                        placeholder='******'
                        {...register("password")}
                    />
                    <p><>{errors.password?.message}</></p>
                </div>
                
                <button type='submit'>SUBMIT</button>
            </form>
        </>
    );
};

export default LoginPage;