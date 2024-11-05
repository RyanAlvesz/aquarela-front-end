import Image from "next/image"
import vector from "$/public/images/svg/login-vector.svg"

const LoginBackground = () => {
    return (
        <div className="w-full h-[25vh] bg-venice-bridge bg-cover bg-center absolute top-0 pointer-events-none flex items-end md:hidden">
            <Image
                className="w-full"
                alt="Vetor azul"
                src={vector}
            />
        </div>
    )
}

export default LoginBackground