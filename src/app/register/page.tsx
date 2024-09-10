export default function Register() {
  return (
    <div className="w-full min-h-screen bg-venice-bridge bg-no-repeat bg-cover bg-fixed flex items-center justify-center">
      <main className="bg-blue-8 rounded-2xl h-fit w-fit px-20 py-16 flex flex-col items-center justify-center drop-shadow-[0px_0px_25px] shadow-blue-9">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-blue-2 font-medium text-5xl">Cadastre-se</h1>
          <span className="text-blue-3 font-medium text-xl">Faça login na sua conta</span>
        </div>
        <form action="">
          <input type="text" className="bg-blue-5/90"/>
        </form>
      </main>
    </div>
    );
}