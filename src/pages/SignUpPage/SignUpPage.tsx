import {useState} from "react";
import {useForm, Controller} from 'react-hook-form';
import {Label} from "@/shared/ui/label.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {Input} from "@/shared/ui/input.tsx";
import {LoadingSpinner} from "@/shared/ui/LoadingSpinner.tsx";
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import {Link} from "react-router-dom";
import {InputFloatingLabel} from "@/shared/ui/inputFloatingLabel.tsx";
import {fireAuth, fireDb, fireStorage} from "@/app/firebaseConfig";

type FormValues = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  avatar: File | undefined
}

export const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    reset,
    setError,
  } = useForm<FormValues>({
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined,
    },
    mode: 'onChange',
  });
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const userResponse = await createUserWithEmailAndPassword(fireAuth, data.email.toLowerCase(), data.password);
      const storageRef = ref(fireStorage, userResponse.user.uid);
      const snapshot = await uploadBytes(storageRef, data.avatar as File);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      await setDoc(doc(fireDb, 'users', userResponse.user.uid), {
        uid: userResponse.user.uid,
        firstName: data.firstName.toLowerCase(),
        lastName: data.lastName.toLowerCase(),
        email: data.email.toLowerCase(),
        photoUrl: downloadUrl,
      });
      await setDoc(doc(fireDb, 'userChats', userResponse.user.uid), {});
      reset();
    } catch (err) {
      switch ((err as Error).message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          setError("email", {message: 'This email is already in use'})
          break;
        case 'Firebase: Error (auth/invalid-email).':
          setError('email', {message: 'Email address is invalid'})
          break;
        default:
          setError('email', {message: 'Something went wrong'})
      }
    }
    setIsLoading(false);
  }
  return (
    <div className={'flex justify-center items-center w-full'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'px-6 pt-6 pb-4 rounded-2xl max-w-md w-full border border-foreground bg-background shadow-3xl dark:shadow-accent'}
      >
        <div className={'flex justify-between mb-4'}>
          <h4 className={'text-2xl'}>Sign up</h4>
          <h2 className={'font-bold text-3xl'}>Є Chat</h2>
        </div>

        <div className={'mb-4'}>
          <Controller
            rules={{
              required: {value: true, message: 'First name is required'},
              pattern: {value: /^[a-zA-Z][a-zA-Z0-9]{3,23}$/, message: 'First name should be 3-24 characters'}
            }}
            control={control}
            render={({field}) => (
              <InputFloatingLabel
                className={'mb-1'}
                label={'First name'}
                id={'signUpFN'}
                type={'text'}
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
              />
            )}
            name={'firstName'}
          />
          {errors.firstName && <p className={'text-red-400 text-sm'}>{errors.firstName.message}</p>}
        </div>

        <div className={'mb-4'}>
          <Controller
            rules={{
              required: {value: true, message: 'Last name is required'},
              pattern: {value: /^[a-zA-Z][a-zA-Z0-9]{3,23}$/, message: 'Last name should be 3-24 characters'}
            }}
            control={control}
            render={({field}) => (
              <InputFloatingLabel
                className={'mb-1'}
                label={'Last Name'}
                id={'signUpLN'}
                type={'text'}
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
              />
            )}
            name={'lastName'}
          />
          {errors.lastName && <p className={'text-red-400 text-sm'}>{errors.lastName.message}</p>}
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
                id={'signUpEmail'}
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
              pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{8,}$/, message: 'Password should be at least 8 characters and include 1 big letter and 1 number'}
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

        <div className={'mb-2'}>
          <Controller
            rules={{
              required: {value: true, message: 'Confirm your password please'},
              validate: {value: (value) => (getValues('password') != value) ? "Password don't match" : undefined}
            }}
            control={control}
            render={({field}) => (
              <InputFloatingLabel
                className={'mb-1'}
                label={'Confirm password'}
                id={'signUpConfirmPassword'}
                type={'password'}
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
              />
            )}
            name={'confirmPassword'}
          />
          {errors.confirmPassword && <p className={'text-red-400 text-sm'}>{errors.confirmPassword.message}</p>}
        </div>

        <div className={'mb-4'}>
          <Label className={'inline-block mb-2 '} htmlFor={'signUpAvatar'}>Avatar</Label>
          <Controller
            rules={{
              required: {value: true, message: 'Avatar is required'}
            }}
            control={control}
            render={({field}) => (
              <Input
                id={'signUpAvatar'}
                type={'file'}
                ref={field.ref}
                name={field.name}
                onChange={(e) => {
                  if(e.target.files?.length) field.onChange(e.target.files[0])
                }}
                value={undefined}
                onBlur={field.onBlur}
              />
            )}
            name={'avatar'}
          />
          {errors.avatar && <p className={'text-red-400 text-sm'}>{errors.avatar?.message}</p>}
        </div>
        <Button className={'w-full bg-primary dark:bg-primary mb-3'}>Submit</Button>
        <p className={'text-center'}>You do have an account ? <Link className={'hover:underline underline-offset-4 font-[600]'} to={'/signIn'}>Sign in</Link></p>
      </form>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};
