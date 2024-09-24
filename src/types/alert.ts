import Swal, { SweetAlertIcon } from 'sweetalert2'

interface alertProps {
    title: string,
    icon: SweetAlertIcon
}

const alert = ({title, icon}: alertProps): void => {
    Swal.fire({
        position: 'top',
        timer: 2000,
        title: `<p class="text-2xl text-blue-2"> ${title} <p>`,
        icon: icon,
        padding: '0.5rem 1rem 1.5rem',
        iconColor: '#5DA5B7',
        showConfirmButton: false,
        width: '25rem',
        background: '#E2E8EB',
        heightAuto: false,
    })
} 

const loader = (): void => {
    Swal.fire({
        position: 'center',
        html: `<div class="flex items-center justify-center w-full h-12 mb-[0.9rem]"> <div class="loader"> </div> </div>`,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/tcc-aquarela.appspot.com/o/aquarela-6.png?alt=media&token=4877d9b2-5da3-40b7-9cea-e367c7e09be8`,
        padding: '0.5rem 1.5rem 1.5rem',
        showConfirmButton: false,
        width: '25rem',
        background: '#E2E8EB',
        heightAuto: false,
    })
} 


export default alert
export {loader}