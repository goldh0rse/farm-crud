import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod'
import { object, string, TypeOf } from 'zod';

const createUserSchema = object({
    name: string({
        required_error: 'Name is required'
    }).min(1, "Name is required"),
    password: string({
        required_error: 'Password is required'
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
        required_error: 'Password Confimation is required'
    }),
    email: string({
        required_error: 'Email is required'
    }).email('Not a valid email')
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
    const router = useRouter();
    //@ts-ignore
    const {registerError, setRegisterError} = useState(null);


    const { 
        register, 
        formState:{errors},
        handleSubmit
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema), 
    });

    async function onSubmit(values: CreateUserInput){
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`, values); // Post user to REST-API
            router.push("/auth/login"); // registered your user gets sent to loginpage
        } catch(e: any) {
            setRegisterError(e.message);
        };
    };

    return (
        <>
            <p>{registerError}</p>
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
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type='text' 
                        placeholder='Jane Doe'
                        {...register("name")}
                    />
                    <p><>{errors.name?.message}</></p>
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
                <div className='form-element'>
                    <label htmlFor="passwordConfirmation">Confirm password</label>
                    <input 
                        id="passwordConfirmation" 
                        type='password' 
                        placeholder='******'
                        {...register("passwordConfirmation")}
                    />
                    <p><>{errors.passwordConfirmation?.message}</></p>
                </div>
                
                <button type='submit'>SUBMIT</button>
            </form>
        </>
    );
};

export default RegisterPage;