import SignInWithEmailPassword from "../component/SigninWithEmailPassword";
import SignInWithGoogle from "../component/SignInWithGoogle";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute bg-neutral-700 inset-0 -z-10">
        <div className="mix-blend-overlay">
          <img
            className="w-full h-screen object-cover object-center mix-blend-overlay bg-neutral-700"
            src="LoginPageImage.jpg"
            alt="Poster"
          />
        </div>
      </div>

      {/* Centered Signup Form */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[85%] lg:w-[70%] h-auto bg-neutral-800/70 rounded-3xl grid grid-cols-4">
          <div className="col-span-0 md:col-span-2">
            {/* Left */}
            <h1 className="hidden md:block text-5xl lg:text-7xl text-left text-red-800 font-black p-10">
              WE KNOW WHAT YOU SHOULD WATCH NEXT(BETTER THAN YOUR FRIENDS DO 😜)
            </h1>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col justify-center p-10">
            {/* Right */}
            <SignInWithEmailPassword />
            <h1 className="text-center my-4">OR</h1>
            <SignInWithGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
