import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/shared/ui/button.tsx";
import {LoadingSpinner} from "@/shared/ui/LoadingSpinner.tsx";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Link} from "react-router-dom";
import {InputFloatingLabel} from "@/shared/ui/inputFloatingLabel.tsx";
import {fireAuth} from "@/app/firebaseConfig";

type FormValues = {
  email: string,
  password: string
}
export const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
    setError,
    reset
  } = useForm<FormValues>({
    values: {
      email: '',
      password: '',
    }
  })
  const onSubmit = async(data: FormValues) => {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(fireAuth, data.email, data.password);
      reset();
    } catch (err) {
      switch ((err as Error).message) {
        case 'Firebase: Error (auth/user-not-found).':
          setError('email', {message: 'User is not Found'})
          break;
        case 'Firebase: Error (auth/wrong-password).':
          setError('password', {message: 'Wrong password'})
          break;
        default:
          setError('email', {message: 'Something went wrong'})
      }
    }
    setIsLoading(false)
  }
  return (
    <div className={'flex justify-center items-center w-full'}>
      <form onSubmit={handleSubmit(onSubmit)} className={'px-6 pt-6 pb-4 rounded-2xl max-w-md w-full border border-foreground bg-background shadow-3xl dark:shadow-accent'}>
        <div className={'flex justify-between mb-4'}>
          <h4 className={'text-2xl '}>Sign In</h4>
          <h2 className={'font-bold text-3xl'}>Є Chat</h2>
        </div>

        <div className={'mb-4'}>
          <Controller
            rules={{
              required: {value: true, message: 'Email is required'},
              pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Should be a valid email address'}
            }}
            control={control}
            render={({field}) => (
              <InputFloatingLabel
                className={'mb-1'}
                label={'Email'}
                id={'signInEmail'}
                type={'email'}
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
              />
            )}
            name={'email'}
          />
          {errors.email && <p className={'text-red-400 text-sm'}>{errors.email.message}</p>}
        </div>

        <div className={'mb-4'}>
          <Controller
            rules={{
              required: {value: true, message: 'Password is required'},
            }}
            control={control}
            render={({field}) => (
              <InputFloatingLabel
                className={'mb-1'}
                label={'Password'}
                id={'signUpPassword'}
                type={'password'}
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
              />
            )}
            name={'password'}
          />
          {errors.password && <p className={'text-red-400 text-sm'}>{errors.password.message}</p>}
        </div>

        <Button className={'w-full bg-primary dark:bg-primary mb-3'}>Submit</Button>
        <p className={'text-center'}>You don't have an account ? <Link className={'hover:underline underline-offset-4 font-[600]'} to={'/signUp'}>Sign up</Link></p>
      </form>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};
